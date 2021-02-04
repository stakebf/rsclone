const AppError = require('./AppError');

class ConflictError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.message = message;
  }
}

module.exports = ConflictError;
