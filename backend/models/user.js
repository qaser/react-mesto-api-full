// models/user.js
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { regexUrl } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return regexUrl.test(v);
      },
      message: "Поле 'avatar' не соответствует формату URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.set('toJSON', {
  transform(doc, user) {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
    return user;
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
