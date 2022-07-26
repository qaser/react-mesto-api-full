const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = String(req.headers.authorization).replace('Bearer ', '');

  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnauthorizedError('Ошибка авторизаци');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
