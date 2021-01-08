const InvalidRequestError = require('../errors/InvalidRequestError');

const validateSchemaPost = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      throw new InvalidRequestError(`Error in POST request. ${error.message}`);
    } else return next();
  };
};

const validateSchemaPut = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error !== undefined) {
      throw new InvalidRequestError(`Error in PUT request. ${error.message}`);
    } else return next();
  };
};

module.exports = { validateSchemaPut, validateSchemaPost };
