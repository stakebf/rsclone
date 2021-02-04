const AppError = require('./AppError');

class ForbittenError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'ForbittenError';
    this.message = message;
  }
}

module.exports = ForbittenError;
