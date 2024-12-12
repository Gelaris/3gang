FROM node:18

WORKDIR /app

# Копируем файлы package.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Открываем порт
EXPOSE 80

# Запускаем сервер
CMD ["npm", "run", "start"] 