const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/UnathorizedError');

const { TOKEN_SECRET_KEY = 'token-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return next(new UnathorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SECRET_KEY);
  } catch (error) {
    return next(new UnathorizedError());
  }

  req.user = payload;
  return next();
};
