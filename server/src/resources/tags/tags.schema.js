const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  userName: Joi.string()
  .required()
  .error(new Error('Field userName is required')),
  date: Joi.string()
  .required()
  .error(new Error('Field date is required')),
  message: Joi.string()
  .required()
  .error(new Error('Field message is required')),
  taskId: String,
});

const schemaForPut = Joi.object().keys({
  id: Joi.string()
    .required()
    .error(new Error('Field id is required')),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.string(),
  boardId: Joi.string()
    .required()
    .error(new Error('Field boardId is required')),
  columnId: Joi.string()
});

module.exports = { schemaForPost, schemaForPut };
