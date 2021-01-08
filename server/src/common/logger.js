const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const path = require('path');
morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.simple(),
      colorize: true
    }),
    new transports.File({
      filename: path.join(__dirname, '../../log/error.log'),
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, '../../log/info.log'),
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../../log/exceptions.log'),
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exitOnError: true
});

const requestLogger = (req, res, next) => {
  const { method, originalUrl } = req;
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);

  logger.info('Request log', {
    Method: method,
    Path: originalUrl,
    'Query params': query,
    Body: body
  });
  next();
};

module.exports = { logger, requestLogger };
