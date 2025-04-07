FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Không cần CMD vì docker-compose.yml đã định nghĩa command
# Nếu muốn fallback khi không dùng Docker Compose:
# CMD ["node", "dist/main"]
EXPOSE 3000