const AppError = require('./AppError');

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'InvalidRequestError';
    this.message = message;
  }
}

module.exports = UnauthorizedError;
