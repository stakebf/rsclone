const catchError = require('./catchError');
const handleInternalError = require('./handlers/handleInternalError');
const handleError = require('./handlers/handleError');

module.exports = { catchError, handleInternalError, handleError };
