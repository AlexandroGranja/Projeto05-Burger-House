# Stage 1: Build Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend

# Copiar package.json e package-lock.json do frontend
COPY frontend/package*.json ./
RUN npm ci --only=production

# Copiar código fonte do frontend
COPY frontend/ ./

# Build da aplicação React
RUN npm run build

# Stage 2: Setup Backend Dependencies
FROM python:3.9-slim as backend-setup
WORKDIR /app/backend

# Copiar requirements.txt do backend
COPY backend/requirements.txt ./

# Instalar dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fonte do backend
COPY backend/ ./

# Stage 3: Production Image
FROM python:3.9-slim

# Instalar Node.js para servir o frontend
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    npm install -g serve && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

WORKDIR /app

# Copiar dependências Python do stage anterior
COPY --from=backend-setup /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=backend-setup /usr/local/bin /usr/local/bin

# Copiar código do backend
COPY --from=backend-setup /app/backend ./backend

# Copiar build do frontend
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Criar script de inicialização
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expor portas (ajuste conforme necessário)
EXPOSE 3000 5000

# Comando de inicialização
CMD ["./start.sh"]