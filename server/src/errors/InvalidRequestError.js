const AppError = require('./AppError');

class InvalidRequestError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'InvalidRequestError';
    this.message = message;
  }
}

module.exports = InvalidRequestError;
