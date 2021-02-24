class UnauthorizedError extends Error {
  constructor(message = 'Необходимо авторизоваться') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
