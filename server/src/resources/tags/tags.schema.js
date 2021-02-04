const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  color: Joi.string(),
  taskId: String,
});

const schemaForPut = Joi.object().keys({
  id: Joi.string()
    .required()
    .error(new Error('Field id is required')),
  color: Joi.string(),
});

module.exports = { schemaForPost, schemaForPut };
