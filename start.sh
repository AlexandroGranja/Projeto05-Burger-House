#!/bin/bash

# Função para cleanup quando o script for interrompido
cleanup() {
    echo "Parando serviços..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Capturar sinais de interrupção
trap cleanup SIGINT SIGTERM

echo "Iniciando aplicação fullstack..."

# Iniciar backend em background
echo "Iniciando backend Python..."
cd /app/backend && python app.py &
BACKEND_PID=$!

# Aguardar um pouco para o backend inicializar
sleep 5

# Iniciar frontend
echo "Iniciando frontend React..."
cd /app && serve -s frontend/build -l 3000 &
FRONTEND_PID=$!

echo "✅ Backend rodando em background (PID: $BACKEND_PID)"
echo "✅ Frontend servindo em http://0.0.0.0:3000 (PID: $FRONTEND_PID)"
echo "📱 Aplicação pronta!"

# Aguardar ambos os processos
wait