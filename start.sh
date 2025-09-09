#!/bin/bash

echo "🍔 Iniciando Burger House..."

# Verificar se os arquivos existem
if [ ! -f "backend/app.py" ]; then
    echo "❌ Erro: backend/app.py não encontrado!"
    exit 1
fi

if [ ! -d "frontend/build" ]; then
    echo "❌ Erro: frontend/build não encontrado!"
    exit 1
fi

# Obter porta do Railway ou usar padrão
PORT=${PORT:-3000}
echo "🌐 Usando porta: $PORT"

# Iniciar backend em background
echo "🚀 Iniciando backend..."
cd backend && python app.py &
BACKEND_PID=$!
cd ..

# Aguardar backend inicializar
sleep 5

# Verificar se backend está rodando
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "❌ Backend falhou ao iniciar!"
    exit 1
fi

echo "✅ Backend rodando (PID: $BACKEND_PID)"

# Iniciar frontend na porta do Railway
echo "🎨 Iniciando frontend na porta $PORT..."
serve -s frontend/build -l $PORT

# Se chegou aqui, o serve parou
echo "⚠️ Frontend parou de rodar"