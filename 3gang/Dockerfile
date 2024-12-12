FROM node:18-alpine

WORKDIR /app

# Установка необходимых зависимостей для сборки
RUN apk add --no-cache python3 make g++

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Устанавливаем глобально vue-tsc для сборки
RUN npm install -g vue-tsc

# Собираем проект
RUN npm run build

# Открываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "run", "start"] 