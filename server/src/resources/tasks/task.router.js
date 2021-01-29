const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./task.service');
const columnService = require('../columns/column.service');
const todosService = require('../todos/todos.service');
const commentService = require('../comments/comments.service');
const tagService = require('../tags/tags.service');
const taskSchemas = require('./task.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const { columnId } = req.params;
    const tasks = await tasksService.getAll(columnId);
    res.status(OK).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { columnId, id } = req.params;
    const task = await tasksService.getTaskById(id, columnId);
    res.status(OK).json(Task.toResponse(task));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { columnId } = req.params;
    const requestData = req.body;
    const task = await tasksService.createTask(
      Task.fromRequest(columnId, requestData), columnId
    );
    await columnService.addTaskToColumn(columnId, task);
    res.status(OK).json(Task.toResponse(task));
  })
);



router.route('/:id').put(
  // catchErrors(validator.validateSchemaPut(taskSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id, columnId } = req.params;
    const requestData = req.body;
    const task = await tasksService.updateTask(id, requestData);
    if (requestData.columnId) {
      await columnService.deleteTaskFromColumn(columnId, id);
      await columnService.addTaskToColumn(requestData.columnId, task, requestData.position);
    } else {
      await columnService.updateTaskOnColumn(columnId, id, task);
    }
    res.status(OK).json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id, columnId } = req.params;
   const deletedBoard = await tasksService.deleteTask(id, columnId);
    // if (deletedBoard.columns.length !== 0) {
    //   await columnsService.deleteColumnFromBoard(id);
    // }

    await todosService.deleteTodosFromTask(id);
    await commentService.deleteCommentFromTask(id);
    await tagService.deleteTagFromTask(id);
    await columnService.deleteTaskFromColumn(columnId, id);
    res
      .status(NO_CONTENT)
      .json(`Task with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
