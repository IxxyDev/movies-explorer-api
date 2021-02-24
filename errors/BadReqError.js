class BadReqError extends Error {
  constructor(message = 'Неверные параметры запроса') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadReqError;
