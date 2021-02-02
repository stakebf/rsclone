const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');
const userService = require('../users/user.service');
const columnsService = require('../columns/column.service');
const boardSchemas = require('./board.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getAllBoardData(id);
    res.status(OK).json(Board.toResponse(board));
  })
);

router.route('/').post(
  catchErrors(validator.validateSchemaPost(boardSchemas.schemaForPost)),
  catchErrors(async (req, res) => {
    const requestData = req.body;
    const newBoard = await boardsService.createBoard(requestData);
    const { admin, id } = newBoard;
    const user = await userService.addBoardToUser(admin, id);
    const board = await boardsService.addUserToList(id, user);
    res.status(OK).json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchErrors(validator.validateSchemaPut(boardSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const requestData = req.body;
    const board = await boardsService.updateBoard(id, requestData);
    if (requestData.title) {
      await userService.updateBoardOnUser({ id: board.id, name: board.title })
    }
    res.status(OK).json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const deletedBoard = await boardsService.deleteBoard(id);
    if (deletedBoard.columns.length !== 0) {
      await columnsService.deleteColumnFromBoard(id);
    }
    res
      .status(NO_CONTENT)
      .json(`Board with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
