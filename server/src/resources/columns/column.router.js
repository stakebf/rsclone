const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const Column = require('./column.model');
const columnsService = require('./column.service');
const taskService = require('../tasks/task.service');
const boardService = require('../boards/board.service');

const columnSchemas = require('./column.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const { boardId } = req.params;
    const columns = await columnsService.getAll(boardId);
    res.status(OK).json(columns.map(Column.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const column = await columnsService.getColumnById(id);
    res.status(OK).json(Column.toResponse(column));
  })
);

router.route('/').post(
  catchErrors(validator.validateSchemaPost(columnSchemas.schemaForPost)),
  catchErrors(async (req, res) => {
    const requestData = req.body;
    const { boardId } = req.params;
    const column = await columnsService.createColumn(requestData, boardId);
    await boardService.addColumnToBoard(boardId, column);
    res.status(OK).json(Column.toResponse(column));
  })
);

router.route('/:id').put(
  catchErrors(validator.validateSchemaPut(columnSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const requestData = req.body;
    const column = await columnsService.updateColumn(id, requestData);
    await boardService.updateColumnData(column.boardId, id, column);
    res.status(OK).json(Column.toResponse(column));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id, boardId } = req.params;
    await columnsService.deleteColumn(id, boardId);
    await taskService.deleteTaskfromColumn(id);
    res
      .status(NO_CONTENT)
      .json(`column with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
