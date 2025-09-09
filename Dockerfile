# Build stage for React frontend
FROM node:18-alpine as build-frontend
WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy frontend source
COPY frontend/ ./

# Build React app
RUN npm run build --verbose

# Production stage
FROM python:3.9-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies first
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# ✅✅✅ CORREÇÃO AQUI: Mude para ./static ✅✅✅
COPY --from=build-frontend /app/frontend/build ./static

# Configure Flask to serve React static files
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV PORT=${PORT:-8080}

EXPOSE $PORT

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/ || exit 1

# Start Python application with correct port
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 app:app