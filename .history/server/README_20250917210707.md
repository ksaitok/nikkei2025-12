# 🏗️ Servidor Backend - Sistema de Demolições NKK

Servidor backend centralizado para o sistema de cadastro e galeria de demolições da NKK Nikkei Kaitai Kogyo.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite** - Banco de dados
- **Multer** - Upload de arquivos
- **Sharp** - Processamento de imagens
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança HTTP

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn

## 🛠️ Instalação

1. **Instalar dependências:**
```bash
cd server
npm install
```

2. **Inicializar banco de dados:**
```bash
npm run init-db
```

3. **Iniciar servidor:**
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## 🌐 Endpoints da API

### Demolições

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/demolitions` | Listar demolições |
| `GET` | `/api/demolitions/:id` | Buscar demolição por ID |
| `POST` | `/api/demolitions` | Criar nova demolição |
| `PUT` | `/api/demolitions/:id` | Atualizar demolição |
| `DELETE` | `/api/demolitions/:id` | Excluir demolição |

### Estatísticas e Dados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/statistics` | Obter estatísticas |
| `GET` | `/api/categories` | Listar categorias |
| `GET` | `/api/locations` | Listar localizações |

## 📊 Estrutura do Banco de Dados

### Tabela `demolitions`
```sql
CREATE TABLE demolitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela `demolition_images`
```sql
CREATE TABLE demolition_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    demolition_id INTEGER NOT NULL,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (demolition_id) REFERENCES demolitions (id) ON DELETE CASCADE
);
```

### Tabela `statistics`
```sql
CREATE TABLE statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_demolitions INTEGER DEFAULT 0,
    residential_count INTEGER DEFAULT 0,
    commercial_count INTEGER DEFAULT 0,
    industrial_count INTEGER DEFAULT 0,
    fire_damage_count INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuração

### Variáveis de Ambiente
```bash
PORT=3000                    # Porta do servidor
NODE_ENV=production         # Ambiente (development/production)
```

### Upload de Imagens
- **Tamanho máximo**: 10MB por arquivo
- **Quantidade máxima**: 10 arquivos por demolição
- **Formatos aceitos**: JPG, PNG, GIF
- **Processamento**: Otimização automática com Sharp

## 📁 Estrutura de Arquivos

```
server/
├── package.json           # Dependências e scripts
├── server.js             # Servidor principal
├── database.sqlite       # Banco de dados SQLite
├── uploads/              # Diretório de uploads
│   └── demolitions/      # Imagens das demolições
└── scripts/
    └── init-database.js  # Script de inicialização
```

## 🔒 Segurança

- **Helmet.js** - Headers de segurança HTTP
- **CORS** - Controle de origem cruzada
- **Rate Limiting** - Limite de requisições por IP
- **Validação de arquivos** - Verificação de tipos e tamanhos
- **Sanitização** - Limpeza de dados de entrada

## 📈 Performance

- **Compressão de imagens** - Redução automática de tamanho
- **Índices de banco** - Otimização de consultas
- **Cache de estatísticas** - Redução de cálculos
- **Paginação** - Controle de volume de dados

## 🐛 Debugging

### Logs do Servidor
```bash
# Ver logs em tempo real
npm run dev

# Logs de produção
npm start
```

### Banco de Dados
```bash
# Acessar banco SQLite
sqlite3 database.sqlite

# Verificar tabelas
.tables

# Verificar dados
SELECT * FROM demolitions;
```

## 🚀 Deploy

### Produção
```bash
# Instalar dependências
npm install --production

# Inicializar banco
npm run init-db

# Iniciar servidor
npm start
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Suporte

Para problemas ou dúvidas:
- **Logs**: Verificar console do servidor
- **Banco**: Verificar integridade do SQLite
- **Uploads**: Verificar permissões do diretório
- **API**: Testar endpoints com Postman/curl

## 🔄 Backup

### Backup do Banco
```bash
# Copiar arquivo do banco
cp database.sqlite backup-$(date +%Y%m%d).sqlite
```

### Backup de Imagens
```bash
# Comprimir diretório de uploads
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/
```

---

**Desenvolvido para NKK Nikkei Kaitai Kogyo** 🏗️
