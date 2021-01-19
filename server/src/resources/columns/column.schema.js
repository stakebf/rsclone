const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  title: Joi.string()
    .required()
    .error(new Error('Field title is required')),
  order: Joi.string(),
  boardId: Joi.string(),
  taskList: Joi.array()
});

const schemaForPut = Joi.object().keys({
  columnId: Joi.string()
    .required()
    .error(new Error('Field id is required')),
  order: Joi.string(),
  boardId: Joi.string(),
  taskList: Joi.array()
});

module.exports = { schemaForPost, schemaForPut };
