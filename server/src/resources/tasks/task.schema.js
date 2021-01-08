const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  boardId: Joi.string()
    .required()
    .error(new Error('Field boardId is required')),
  title: Joi.string()
    .required()
    .error(new Error('Field title is required')),
  order: Joi.number()
    .required()
    .error(new Error('Field order is required')),
  description: Joi.string(),
  userId: Joi.string(),
  columnId: Joi.string()
    .required()
    .error(new Error('Field columnId is required'))
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
