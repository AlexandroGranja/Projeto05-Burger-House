# Build stage for React frontend
FROM node:18-alpine as build-frontend
WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies with verbose logging
RUN npm install --verbose

# Copy frontend source
COPY frontend/ ./

# Build with verbose output
RUN npm run build --verbose

# List build output for debugging
RUN ls -la build/

# Production stage
FROM python:3.9-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend
COPY --from=build-frontend /app/frontend/build ./static

# Verify static files were copied
RUN ls -la static/ || echo "No static files found!"

# Use PORT from Railway environment
ENV PORT=${PORT:-8000}
EXPOSE $PORT

# Start Python directly (more reliable than shell script)
CMD ["python", "app.py"]