const Board = require('./board.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const getAll = async () => {
  return Board.find({});
};

const getAllBoardData = async (boardId, columnsData) => {
  const board = await getBoardById(boardId);
 const updatedBoard = await addColumnToBoard(boardId, columnsData);
 return updatedBoard;
}

const getBoardById = async id => {
  const board = await Board.findById(id);
  if (board === null) {
    throw new NotFoundError(`Board with id ${id} not found`);
  }
  return board;
};

const createBoard = async newBoard => {
  return Board.create(newBoard);
};

const updateBoard = async (id, dataForUpdate) => {
  const updatedBoard = await Board.findByIdAndUpdate(id, dataForUpdate, {
    new: true
  });
  if (updatedBoard === null) {
    throw new NotFoundError(`Board with id ${id} not found`);
  }
  return updatedBoard;
};

const deleteBoard = async id => {
  const deletedBoard = await Board.findOneAndDelete({ _id: id });
  if (deletedBoard === null) {
    throw new NotFoundError(`Board with id ${id} not found`);
  }
  return deletedBoard;
};

const addColumnToBoard = async (id, columnData) => {
  const updatedBoard = await Board.findByIdAndUpdate(id, {
    columns: columnData
  }, {
    new: true
  });
  if (updatedBoard === null) {
    throw new NotFoundError(`Board with id ${id} not found`);
  }
  return updatedBoard;
};

const deleteColumnFromBoard = async (id, columnData) => {
  const updatedBoard = await Board.findByIdAndUpdate(id, {
    $:
      { columns: columnData }
  }, {
    new: true
  });
  if (updatedBoard === null) {
    throw new NotFoundError(`Board with id ${id} not found`);
  }
  return updatedBoard;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumnToBoard,
  getAllBoardData
};
