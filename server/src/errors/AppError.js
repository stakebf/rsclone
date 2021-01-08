class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AppError';
    this.message = message;
  }
}

module.exports = AppError;
