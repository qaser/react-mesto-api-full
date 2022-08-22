const allowedCors = [
  'http://huji.students.nomoredomains.xyz',
  'https://huji.students.nomoredomains.xyz',
  'http://api.huji.students.nomorepartiesxyz.ru',
  'https://api.huji.students.nomorepartiesxyz.ru',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  const { methodHttp } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (methodHttp === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
}
