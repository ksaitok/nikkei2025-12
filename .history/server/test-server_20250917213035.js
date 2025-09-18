const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite');
    }
});

// Rota de teste
app.get('/api/test', (req, res) => {
    res.json({ message: 'Servidor funcionando!', timestamp: new Date().toISOString() });
});

// Rota de estatísticas
app.get('/api/statistics', (req, res) => {
    db.get('SELECT * FROM statistics WHERE id = 1', (err, row) => {
        if (err) {
            console.error('Erro ao buscar estatísticas:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        if (!row) {
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

// Rota para listar demolições
app.get('/api/demolitions', (req, res) => {
    db.all(`
        SELECT d.*, 
               GROUP_CONCAT(di.filename) as images,
               COUNT(di.id) as image_count
        FROM demolitions d
        LEFT JOIN demolition_images di ON d.id = di.demolition_id
        GROUP BY d.id 
        ORDER BY d.created_at DESC
    `, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar demolições:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        const demolitions = rows.map(row => ({
            ...row,
            images: row.images ? row.images.split(',') : []
        }));
        
        res.json({
            demolitions,
            pagination: {
                page: 1,
                limit: 20,
                total: demolitions.length
            }
        });
    });
});

// Servir arquivos estáticos
app.use(express.static('../'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor de teste rodando na porta ${PORT}`);
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
