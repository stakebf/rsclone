const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  userName: Joi.string()
    .required()
    .error(new Error('Field userName is required')),
  userId: Joi.string()
    .required()
    .error(new Error('Field userName is required')),
  date: Joi.string(),
  message: Joi.string()
    .required()
    .error(new Error('Field message is required')),
  taskId: Joi.string(),
});

const schemaForPut = Joi.object().keys({
  id: Joi.string()
    .required()
    .error(new Error('Field id is required')),
  message: Joi.string(),
  date: Joi.string()
});

module.exports = { schemaForPost, schemaForPut };
