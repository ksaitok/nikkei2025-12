const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de segurança
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests por IP
});
app.use('/api/', limiter);

// Middleware para parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../')));

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads', 'demolitions');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 10 // máximo 10 arquivos
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos de imagem são permitidos'), false);
        }
    }
});

// Inicializar banco de dados
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        initDatabase();
    }
});

// Inicializar tabelas do banco de dados
function initDatabase() {
    // Tabela de demolições
    db.run(`
        CREATE TABLE IF NOT EXISTS demolitions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            location TEXT NOT NULL,
            date TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de imagens
    db.run(`
        CREATE TABLE IF NOT EXISTS demolition_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            demolition_id INTEGER NOT NULL,
            filename TEXT NOT NULL,
            original_name TEXT NOT NULL,
            file_size INTEGER NOT NULL,
            mime_type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (demolition_id) REFERENCES demolitions (id) ON DELETE CASCADE
        )
    `);

    // Tabela de estatísticas (cache)
    db.run(`
        CREATE TABLE IF NOT EXISTS statistics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_demolitions INTEGER DEFAULT 0,
            residential_count INTEGER DEFAULT 0,
            commercial_count INTEGER DEFAULT 0,
            industrial_count INTEGER DEFAULT 0,
            fire_damage_count INTEGER DEFAULT 0,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('Tabelas do banco de dados inicializadas');
}

// Função para atualizar estatísticas
function updateStatistics() {
    db.get("SELECT COUNT(*) as total FROM demolitions", (err, row) => {
        if (err) {
            console.error('Erro ao contar demolições:', err);
            return;
        }
        
        const total = row.total;
        
        // Contar por categoria
        db.get("SELECT COUNT(*) as count FROM demolitions WHERE category = 'residential'", (err, row) => {
            const residential = row ? row.count : 0;
            
            db.get("SELECT COUNT(*) as count FROM demolitions WHERE category = 'commercial'", (err, row) => {
                const commercial = row ? row.count : 0;
                
                db.get("SELECT COUNT(*) as count FROM demolitions WHERE category = 'industrial'", (err, row) => {
                    const industrial = row ? row.count : 0;
                    
                    db.get("SELECT COUNT(*) as count FROM demolitions WHERE category = 'fire-damage'", (err, row) => {
                        const fireDamage = row ? row.count : 0;
                        
                        // Atualizar ou inserir estatísticas
                        db.run(`
                            INSERT OR REPLACE INTO statistics 
                            (id, total_demolitions, residential_count, commercial_count, industrial_count, fire_damage_count, last_updated)
                            VALUES (1, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                        `, [total, residential, commercial, industrial, fireDamage]);
                    });
                });
            });
        });
    });
}

// Função para processar e otimizar imagens
async function processImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize(1200, 1200, { 
                fit: 'inside',
                withoutEnlargement: true 
            })
            .jpeg({ quality: 85 })
            .toFile(outputPath);
        
        // Remover arquivo original se for diferente do otimizado
        if (inputPath !== outputPath) {
            fs.unlinkSync(inputPath);
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao processar imagem:', error);
        return false;
    }
}

// ==================== ROTAS DA API ====================

// GET /api/demolitions - Listar todas as demolições
app.get('/api/demolitions', (req, res) => {
    const { category, location, search, page = 1, limit = 20 } = req.query;
    
    let query = `
        SELECT d.*, 
               GROUP_CONCAT(di.filename) as images,
               GROUP_CONCAT(di.original_name) as image_names,
               COUNT(di.id) as image_count
        FROM demolitions d
        LEFT JOIN demolition_images di ON d.id = di.demolition_id
    `;
    
    const conditions = [];
    const params = [];
    
    if (category) {
        conditions.push('d.category = ?');
        params.push(category);
    }
    
    if (location) {
        conditions.push('d.location LIKE ?');
        params.push(`%${location}%`);
    }
    
    if (search) {
        conditions.push('(d.title LIKE ? OR d.description LIKE ? OR d.location LIKE ?)');
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' GROUP BY d.id ORDER BY d.created_at DESC';
    
    // Paginação
    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;
    
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar demolições:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        // Processar imagens
        const demolitions = rows.map(row => ({
            ...row,
            images: row.images ? row.images.split(',') : [],
            image_names: row.image_names ? row.image_names.split(',') : []
        }));
        
        res.json({
            demolitions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: rows.length
            }
        });
    });
});

// GET /api/demolitions/:id - Buscar demolição por ID
app.get('/api/demolitions/:id', (req, res) => {
    const { id } = req.params;
    
    db.get(`
        SELECT d.*, 
               GROUP_CONCAT(di.filename) as images,
               GROUP_CONCAT(di.original_name) as image_names,
               COUNT(di.id) as image_count
        FROM demolitions d
        LEFT JOIN demolition_images di ON d.id = di.demolition_id
        WHERE d.id = ?
        GROUP BY d.id
    `, [id], (err, row) => {
        if (err) {
            console.error('Erro ao buscar demolição:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Demolição não encontrada' });
        }
        
        const demolition = {
            ...row,
            images: row.images ? row.images.split(',') : [],
            image_names: row.image_names ? row.image_names.split(',') : []
        };
        
        res.json(demolition);
    });
});

// POST /api/demolitions - Criar nova demolição
app.post('/api/demolitions', upload.array('images', 10), async (req, res) => {
    try {
        const { title, category, description, location, date } = req.body;
        
        if (!title || !category || !description || !location || !date) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        
        // Inserir demolição
        db.run(`
            INSERT INTO demolitions (title, category, description, location, date)
            VALUES (?, ?, ?, ?, ?)
        `, [title, category, description, location, date], function(err) {
            if (err) {
                console.error('Erro ao criar demolição:', err);
                return res.status(500).json({ error: 'Erro ao criar demolição' });
            }
            
            const demolitionId = this.lastID;
            
            // Processar imagens se houver
            if (req.files && req.files.length > 0) {
                let processedImages = 0;
                
                req.files.forEach(async (file, index) => {
                    try {
                        // Processar e otimizar imagem
                        const optimizedPath = file.path.replace(/\.[^/.]+$/, '_optimized.jpg');
                        const success = await processImage(file.path, optimizedPath);
                        
                        if (success) {
                            // Salvar informações da imagem no banco
                            db.run(`
                                INSERT INTO demolition_images (demolition_id, filename, original_name, file_size, mime_type)
                                VALUES (?, ?, ?, ?, ?)
                            `, [
                                demolitionId,
                                path.basename(optimizedPath),
                                file.originalname,
                                fs.statSync(optimizedPath).size,
                                'image/jpeg'
                            ]);
                        }
                        
                        processedImages++;
                        
                        // Se todas as imagens foram processadas, atualizar estatísticas
                        if (processedImages === req.files.length) {
                            updateStatistics();
                            res.json({ 
                                message: 'Demolição criada com sucesso',
                                id: demolitionId 
                            });
                        }
                    } catch (error) {
                        console.error('Erro ao processar imagem:', error);
                        processedImages++;
                    }
                });
            } else {
                updateStatistics();
                res.json({ 
                    message: 'Demolição criada com sucesso',
                    id: demolitionId 
                });
            }
        });
        
    } catch (error) {
        console.error('Erro ao criar demolição:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// PUT /api/demolitions/:id - Atualizar demolição
app.put('/api/demolitions/:id', (req, res) => {
    const { id } = req.params;
    const { title, category, description, location, date } = req.body;
    
    if (!title || !category || !description || !location || !date) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    db.run(`
        UPDATE demolitions 
        SET title = ?, category = ?, description = ?, location = ?, date = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [title, category, description, location, date, id], function(err) {
        if (err) {
            console.error('Erro ao atualizar demolição:', err);
            return res.status(500).json({ error: 'Erro ao atualizar demolição' });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Demolição não encontrada' });
        }
        
        updateStatistics();
        res.json({ message: 'Demolição atualizada com sucesso' });
    });
});

// DELETE /api/demolitions/:id - Excluir demolição
app.delete('/api/demolitions/:id', (req, res) => {
    const { id } = req.params;
    
    // Primeiro, buscar imagens para excluir arquivos
    db.all('SELECT filename FROM demolition_images WHERE demolition_id = ?', [id], (err, images) => {
        if (err) {
            console.error('Erro ao buscar imagens:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        // Excluir arquivos de imagem
        images.forEach(img => {
            const imagePath = path.join(__dirname, 'uploads', 'demolitions', img.filename);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });
        
        // Excluir demolição (as imagens serão excluídas automaticamente por CASCADE)
        db.run('DELETE FROM demolitions WHERE id = ?', [id], function(err) {
            if (err) {
                console.error('Erro ao excluir demolição:', err);
                return res.status(500).json({ error: 'Erro ao excluir demolição' });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Demolição não encontrada' });
            }
            
            updateStatistics();
            res.json({ message: 'Demolição excluída com sucesso' });
        });
    });
});

// GET /api/statistics - Obter estatísticas
app.get('/api/statistics', (req, res) => {
    db.get('SELECT * FROM statistics WHERE id = 1', (err, row) => {
        if (err) {
            console.error('Erro ao buscar estatísticas:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        if (!row) {
            // Se não há estatísticas, calcular agora
            updateStatistics();
            return res.json({
                total_demolitions: 0,
                residential_count: 0,
                commercial_count: 0,
                industrial_count: 0,
                fire_damage_count: 0,
                last_updated: new Date().toISOString()
            });
        }
        
        res.json(row);
    });
});

// GET /api/categories - Listar categorias
app.get('/api/categories', (req, res) => {
    const categories = [
        { value: 'residential', label: 'Residencial' },
        { value: 'commercial', label: 'Comercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'fire-damage', label: 'Pós-Incêndio' }
    ];
    
    res.json(categories);
});

// GET /api/locations - Listar localizações únicas
app.get('/api/locations', (req, res) => {
    db.all('SELECT DISTINCT location FROM demolitions ORDER BY location', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar localizações:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        const locations = rows.map(row => row.location);
        res.json(locations);
    });
});

// Rota para servir a aplicação frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
    console.error('Erro:', error);
    
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'Arquivo muito grande (máx. 10MB)' });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ error: 'Muitos arquivos (máx. 10)' });
        }
    }
    
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 API disponível em http://localhost:${PORT}/api/`);
    console.log(`🌐 Frontend disponível em http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Encerrando servidor...');
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar banco de dados:', err);
        } else {
            console.log('✅ Banco de dados fechado');
        }
        process.exit(0);
    });
});
