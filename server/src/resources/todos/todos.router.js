const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const Todos = require('./todos.model');
const todosService = require('./todos.service');
const todosSchema = require('./todos.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const todos = await todosService.getAll(taskId);
    res.status(OK).json(todos.map(Todos.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const requestData = req.body;
    const todos = await todosService.createTodos(taskId, requestData)
    res.status(OK).json(Todos.toResponse(todos));
  })
);

router.route('/:id/todo').post(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    const requestData = req.body;
    const todo = await todosService.createTodoItem(id, taskId, requestData)
    res.status(OK).json(Todos.toResponse(todo));
  })
);

router.route('/:id').put(
  // catchErrors(validator.validateSchemaPut(todosSchema.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    const requestData = req.body;
    const todos = await todosService.updateTodos(id, taskId, requestData);
    res.status(OK).json(Todos.toResponse(todos));
  })
);

router.route('/:id/todo/:itemId').put(
  // catchErrors(validator.validateSchemaPut(todosSchema.schemaForPut)),
  catchErrors(async (req, res) => {
    const { itemId, taskId} = req.params;
    const requestData = req.body;
    const todos = await todosService.updateTodoItem(itemId, requestData, taskId);
    res.status(OK).json(Todos.toResponse(todos));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    await todosService.deleteTodos(id, taskId);
    res
      .status(NO_CONTENT)
      .json(`Todos with id ${id} has been succesfully deleted`);
  })
);

router.route('/:id/todo/:itemId').delete(
  catchErrors(async (req, res) => {
    const { id, itemId } = req.params;
    await todosService.deleteTodoItem(id, itemId);
    res
      .status(NO_CONTENT)
      .json(`Todos with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
