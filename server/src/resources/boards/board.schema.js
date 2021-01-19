const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  title: Joi.string()
    .required()
    .error(new Error('Field title is required')),
  columns: Joi.array(),
  userList: Joi.array()
});

const schemaForPut = Joi.object().keys({
  id: Joi.string()
    .required()
    .error(new Error('Field id is required')),
  title: Joi.string(),
  columns: Joi.array()
});

module.exports = { schemaForPost, schemaForPut };
