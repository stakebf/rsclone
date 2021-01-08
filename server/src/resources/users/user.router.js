const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const usersSchemas = require('./users.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    res.status(OK).json(User.toResponse(user));
  })
);

router.route('/').post(
  catchErrors(validator.validateSchemaPost(usersSchemas.schemaForPost)),
  catchErrors(async (req, res) => {
    const requestData = req.body;
    const user = await usersService.createUser(requestData);
    res.status(OK).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(validator.validateSchemaPut(usersSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const requestData = req.body;
    const user = await usersService.updateUser(id, requestData);
    res.status(OK).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    await usersService.deleteUser(id);
    res
      .status(NO_CONTENT)
      .json(`User with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
