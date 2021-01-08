const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET_KEY } = require('./config');

const checkToken = (req, next) => {
  const token = req.header('Authorization');
  try {
    if (!token) {
      throw new UnauthorizedError('No token provided');
    } else {
      const isBearer = token.substring(0, 7);
      if (isBearer !== 'Bearer ') {
        throw new UnauthorizedError(
          'Authorization header doesn’t follow Bearer scheme'
        );
      }
      const userData = jwt.verify(token.slice(7), JWT_SECRET_KEY);
      return userData;
    }
  } catch (error) {
    return next(error);
  }
};

const authorizate = (req, res, next) => {
  const route = req.originalUrl;
  if (
    route === '/' ||
    route === '/doc' ||
    route === '/login' ||
    route === '/favicon.ico'
  ) {
    return next();
  }
  checkToken(req, next);
  next();
};

module.exports = authorizate;
