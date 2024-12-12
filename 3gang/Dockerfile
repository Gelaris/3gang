# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Установка зависимостей для сборки
RUN apk add --no-cache python3 make g++

# Копируем только файлы package.json сначала
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Этап production
FROM node:18-alpine

WORKDIR /app

# Копируем только необходимые файлы из этапа сборки
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Устанавливаем только production зависимости
RUN npm install --production

# Открываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "run", "start"] 