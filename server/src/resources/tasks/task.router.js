const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./task.service');
const taskSchemas = require('./task.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.status(OK).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getTaskById(id, boardId);
    res.status(OK).json(Task.toResponse(task));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { boardId } = req.params;
    const requestData = req.body;
    const task = await tasksService.createTask(
      Task.fromRequest(boardId, requestData)
    );
    res.status(OK).json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  catchErrors(validator.validateSchemaPut(taskSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id, boardId } = req.params;
    const requestData = req.body;
    const task = await tasksService.updateTask(id, boardId, requestData);
    res.status(OK).json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id, boardId } = req.params;
    await tasksService.deleteTask(id, boardId);
    res
      .status(NO_CONTENT)
      .json(`Task with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
