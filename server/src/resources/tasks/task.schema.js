const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  title: Joi.string()
    .required()
    .error(new Error('Field title is required')),
  order: Joi.number(),
  description: Joi.string(),
  usersList: Joi.array(),
  todos: Joi.object(),
  comments: Joi.array(),
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
  usersList: Joi.array(),
  todos: Joi.object(),
  comments: Joi.array(),
  columnId: Joi.string(),
  position: Joi.number()
});

module.exports = { schemaForPost, schemaForPut };
