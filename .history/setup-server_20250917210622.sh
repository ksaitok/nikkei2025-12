#!/bin/bash

# Script de configuração do servidor backend
# Sistema de Demolições NKK

echo "🏗️  Configurando Servidor Backend - NKK Demolições"
echo "=================================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 16+ primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js versão 16+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Navegar para o diretório do servidor
cd server

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas"

# Inicializar banco de dados
echo "🗄️  Inicializando banco de dados..."
npm run init-db

if [ $? -ne 0 ]; then
    echo "❌ Erro ao inicializar banco de dados"
    exit 1
fi

echo "✅ Banco de dados inicializado"

# Criar diretório de uploads
echo "📁 Criando diretórios..."
mkdir -p uploads/demolitions
chmod 755 uploads/demolitions

echo "✅ Diretórios criados"

# Voltar ao diretório raiz
cd ..

echo ""
echo "🎉 Configuração concluída com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Iniciar servidor: cd server && npm start"
echo "   2. Acessar API: http://localhost:3000/api/"
echo "   3. Acessar frontend: http://localhost:3000/"
echo ""
echo "🔧 Comandos úteis:"
echo "   • Iniciar servidor: cd server && npm start"
echo "   • Modo desenvolvimento: cd server && npm run dev"
echo "   • Reinicializar banco: cd server && npm run init-db"
echo ""
echo "📊 Endpoints disponíveis:"
echo "   • GET  /api/demolitions     - Listar demolições"
echo "   • POST /api/demolitions     - Criar demolição"
echo "   • GET  /api/statistics      - Estatísticas"
echo "   • GET  /api/categories      - Categorias"
echo ""
echo "🚀 Sistema pronto para uso!"
