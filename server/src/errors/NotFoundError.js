const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message;
  }
}

module.exports = NotFoundError;
