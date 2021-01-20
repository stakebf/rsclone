const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const Todos = require('./todos.model');
const todosService = require('./todos.service');
const taskSchemas = require('./todos.schema');
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
    res.status(OK).json(todo);
  })
);

// router.route('/:id').get(
//   catchErrors(async (req, res) => {
//     const { taskId, id } = req.params;
//     const task = await todosService.getTaskById(id, taskId);
//     res.status(OK).json(Task.toResponse(task));
//   })
// );

router.route('/').post(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const requestData = req.body;
    const task = await todosService.createTask(
      Task.fromRequest(taskId, requestData), taskId
    );
    res.status(OK).json(Task.toResponse(task));
  })
);

router.route('/:id/todos').post(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    const requestData = req.body;
    const todos = await todosService.createTodos(id, taskId, requestData)
    res.status(OK).json(Todos.toResponse(todos));
  })
);

router.route('/:id/todos/todo').post(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    const requestData = req.body;
    const todo = await todosService.createTodoItem(id, taskId, requestData)
    res.status(OK).json(Todos.toResponse(todo));
  })
);

router.route('/:id').put(
  catchErrors(validator.validateSchemaPut(taskSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    const requestData = req.body;
    const task = await todosService.updateTask(id, taskId, requestData);
    res.status(OK).json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    await todosService.deleteTask(id, taskId);
    res
      .status(NO_CONTENT)
      .json(`Task with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
