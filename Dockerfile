# Stage 1: Build Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend

# Copiar package.json do frontend
COPY frontend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte do frontend
COPY frontend/ ./

# Build da aplicação React
RUN npm run build

# Stage 2: Production Image
FROM python:3.9-slim

# Instalar Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g serve && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar e instalar dependências Python
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código do backend
COPY backend/ ./backend/

# Copiar build do frontend
COPY --from=frontend-build /app/frontend/build ./frontend/build/

# Criar script simplificado de inicialização
RUN echo '#!/bin/bash\n\
echo "Iniciando Burger House..."\n\
python backend/app.py &\n\
BACKEND_PID=$!\n\
echo "Backend iniciado (PID: $BACKEND_PID)"\n\
sleep 5\n\
serve -s frontend/build -l ${PORT:-3000} &\n\
FRONTEND_PID=$!\n\
echo "Frontend servindo na porta ${PORT:-3000} (PID: $FRONTEND_PID)"\n\
wait' > start.sh && chmod +x start.sh

# Usar a porta do Railway
EXPOSE ${PORT:-3000}

# Comando de inicialização
CMD ["./start.sh"]