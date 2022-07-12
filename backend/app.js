const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { registerValid, loginValid } = require('./middlewares/validationJoi');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env; // Слушаем 3000 порт
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.post('/signin', loginValid, login);
app.post('/signup', registerValid, createUser);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

// обработка некорректного адреса
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
