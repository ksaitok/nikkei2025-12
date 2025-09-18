const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.join(__dirname, '../database.sqlite');

// Conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite');
        initializeDatabase();
    }
});

function initializeDatabase() {
    console.log('🔧 Inicializando banco de dados...');
    
    // Criar tabela de demolições
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
    `, (err) => {
        if (err) {
            console.error('❌ Erro ao criar tabela demolitions:', err);
        } else {
            console.log('✅ Tabela demolitions criada');
        }
        
        // Criar tabela de imagens
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
        `, (err) => {
            if (err) {
                console.error('❌ Erro ao criar tabela demolition_images:', err);
            } else {
                console.log('✅ Tabela demolition_images criada');
            }
            
            // Criar tabela de estatísticas
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
            `, (err) => {
                if (err) {
                    console.error('❌ Erro ao criar tabela statistics:', err);
                } else {
                    console.log('✅ Tabela statistics criada');
                }
                
                // Aguardar um pouco para as tabelas serem criadas
                setTimeout(() => {
                    insertSampleData();
                }, 1000);
            });
        });
    });
}

function insertSampleData() {
    console.log('📝 Inserindo dados de exemplo...');
    
    // Verificar se já existem dados
    db.get('SELECT COUNT(*) as count FROM demolitions', (err, row) => {
        if (err) {
            console.error('❌ Erro ao verificar dados existentes:', err);
            return;
        }
        
        if (row.count > 0) {
            console.log('ℹ️  Dados já existem no banco');
            closeDatabase();
            return;
        }
        
        // Inserir demolições de exemplo
        const sampleDemolitions = [
            {
                title: 'Demolição Residencial - Casa de Madeira',
                category: 'residential',
                description: 'Demolição completa de casa residencial de madeira com 2 andares. Remoção de todos os materiais e limpeza do terreno.',
                location: 'São Paulo, SP',
                date: '2024-01-15'
            },
            {
                title: 'Demolição Comercial - Galpão Industrial',
                category: 'commercial',
                description: 'Demolição de galpão industrial antigo para construção de novo complexo comercial. Remoção de estruturas de concreto e aço.',
                location: 'Rio de Janeiro, RJ',
                date: '2024-02-20'
            },
            {
                title: 'Demolição Pós-Incêndio - Edifício Residencial',
                category: 'fire-damage',
                description: 'Demolição de emergência de edifício residencial após incêndio. Remoção segura de estruturas comprometidas pelo fogo.',
                location: 'Belo Horizonte, MG',
                date: '2024-03-10'
            },
            {
                title: 'Demolição Industrial - Fábrica Têxtil',
                category: 'industrial',
                description: 'Demolição de antiga fábrica têxtil para reurbanização. Remoção de equipamentos industriais e estruturas.',
                location: 'Porto Alegre, RS',
                date: '2024-04-05'
            }
        ];
        
        let insertedCount = 0;
        
        sampleDemolitions.forEach((demolition, index) => {
            db.run(`
                INSERT INTO demolitions (title, category, description, location, date)
                VALUES (?, ?, ?, ?, ?)
            `, [demolition.title, demolition.category, demolition.description, demolition.location, demolition.date], function(err) {
                if (err) {
                    console.error(`❌ Erro ao inserir demolição ${index + 1}:`, err);
                } else {
                    console.log(`✅ Demolição ${index + 1} inserida (ID: ${this.lastID})`);
                    insertedCount++;
                    
                    if (insertedCount === sampleDemolitions.length) {
                        console.log('🎉 Dados de exemplo inseridos com sucesso!');
                        closeDatabase();
                    }
                }
            });
        });
    });
}

function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('❌ Erro ao fechar banco de dados:', err);
        } else {
            console.log('✅ Banco de dados fechado');
            console.log('🚀 Banco de dados inicializado com sucesso!');
            console.log('💡 Execute "npm start" para iniciar o servidor');
        }
    });
}
