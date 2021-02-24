class ConflictError extends Error {
  constructor(message = 'Возник конфликт при авторизации') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
