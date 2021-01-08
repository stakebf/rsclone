const { logger } = require('../../common/logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const handleInternalError = (err, req, res) => {
  logger.error({
    'error code': getStatusText(INTERNAL_SERVER_ERROR),
    url: `Ocured an error in path ${req.originalUrl}`,
    message: err.message,
    stack: err.stack
  });
  res.status(INTERNAL_SERVER_ERROR).json({
    code: INTERNAL_SERVER_ERROR,
    message: err.message,
    url: `Ocured an error in path ${req.originalUrl}`
  });
};

module.exports = handleInternalError;
