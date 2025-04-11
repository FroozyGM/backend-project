# API сервиса бронирования коворкингов

Серверная часть приложения для бронирования коворкингов с использованием Node.js.

## Функциональность

- Авторизация и регистрация пользователей
- Просмотр и поиск коворкингов
- Бронирование коворкингов
- Управление профилем пользователя
- Просмотр истории бронирований

## Технологии

- Node.js
- Express.js
- MongoDB
- JWT аутентификация
- Swagger для документации API

## Установка

1. Клонировать репозиторий

   ```
   git clone https://github.com/ваш-логин/название-репозитория.git
   cd название-репозитория
   ```

2. Установить зависимости

   ```
   npm install express mongoose jsonwebtoken bcryptjs cors dotenv express-validator nodemon --save-dev
   ```

3. Создать файл .env в корне проекта и добавить переменные окружения

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/coworking
   JWT_SECRET=your_jwt_secret_key
   ```

4. Запустить приложение

   ```
   npm start
   ```

5. Документация API доступна по адресу
   ```
   http://localhost:3000/docs
   ```

## API Endpoints

- **Авторизация**

  - POST /api/auth/register - регистрация нового пользователя
  - POST /api/auth/login - вход в систему
  - POST /api/auth/logout - выход из системы

- **Пользователи**

  - GET /api/users/profile - получить профиль
  - PUT /api/users/profile - обновить профиль
  - GET /api/users/bookings - история бронирований
  - GET /api/users/current-bookings - текущие бронирования

- **Коворкинги**

  - GET /api/coworkings - список всех коворкингов
  - GET /api/coworkings/:id - детали коворкинга
  - POST /api/coworkings/:id/book - забронировать коворкинг

- **Бронирования**
  - POST /api/bookings - создать бронирование
  - GET /api/bookings/user - получить бронирования пользователя
  - PATCH /api/bookings/:id/cancel - отменить бронирование
