# frontend/Dockerfile

# Node.js imajını kullan
FROM node:22-slim

# Çalışma dizinini belirle
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm ci

# Tüm dosyaları kopyala
COPY . .

# React uygulamasını build et
EXPOSE 5173

# Uygulamayı çalıştır
CMD ["npm", "run", "dev", "--host"]