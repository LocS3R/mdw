FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run migration:run
CMD ["node", "dist/main"]
EXPOSE 3000
