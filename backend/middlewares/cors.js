const cors = require('cors');

const allowedCors = {
  origin: [
    'https://huji.students.nomoredomains.xyz',
    'http://huji.students.nomoredomains.xyz',
    'http://qaser.ru',
    'https://qaser.ru',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
