const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const boardsService = require('../boards/board.service');
const taskService = require('../tasks/task.service');
const usersSchemas = require('./users.schema');
const { registerUser } = require('../login/login.service')
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

router.route('/:id/addtoboard').post(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { boardId } = req.body;
    const user = await usersService.getUserById(id);
    const { title } = await boardsService.addUserToList(boardId, user);
    const updatedUser = await usersService.addBoardToUser(id, { id: boardId, name: title });
    res.status(OK).json(User.toResponse(updatedUser));
  })
);

router.route('/:id/addtotask').post(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { taskId } = req.body;
    const user = await usersService.addTaskToUser(id, taskId);
    await taskService.addUserToList(taskId, user);
    res.status(OK).json(User.toResponse(user));
  })
);


router.route('/:id/addtoboard').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { boardId } = req.body;
    await usersService.deleteUserFromBoardList(id, boardId);
    await boardsService.deleteUserFromBoardList(boardId, id);
    res
      .status(NO_CONTENT)
      .json(`User with id ${id} has been succesfully deleted from board`);
  })
);

router.route('/:id/addtotask').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { taskId } = req.body;
    await usersService.deleteUserFromTaskList(id, taskId);
    await taskService.deleteUserFromTaskList(taskId, id);
    res
      .status(NO_CONTENT)
      .json(`User with id ${id} has been succesfully deleted from task`);
  })
);



router.route('/').post(
  catchErrors(validator.validateSchemaPost(usersSchemas.schemaForPost)),
  catchErrors(async (req, res) => {
    const requestData = req.body;
    const { token, id } = await registerUser(requestData);
    res.status(OK).json({ token, id });
  })
);


router.route('/:id').put(
  catchErrors(validator.validateSchemaPut(usersSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const requestData = req.body;
    const user = await usersService.updateUser(id, requestData);
    await boardsService.updateUserData(user);
    await taskService.updateUserData(user);
    res.status(OK).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    await usersService.deleteUser(id);
    await boardsService.findAllBoardOnUser(id);
    await taskService.unassignTask(id);
    res
      .status(NO_CONTENT)
      .json(`User with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
