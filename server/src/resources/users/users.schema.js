const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  name: Joi.string()
    .required()
    .error(new Error('Field name is required')),

  password: Joi.string()
    .required()
    .error(new Error('Field password is required')),
  login: Joi.string()
    .required()
    .error(new Error('Field login is required'))
});

const schemaForPut = Joi.object().keys({
  id: Joi.string()
    .required()
    .error(new Error('Field id is required')),
  name: Joi.string(),
  password: Joi.string(),
  login: Joi.string()
});

module.exports = { schemaForPost, schemaForPut };
