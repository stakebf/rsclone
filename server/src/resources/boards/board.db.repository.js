const Board = require('./board.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const getAll = async () => {
  return Board.find({});
};

const getBoardById = async id => {
  const board = await Board.findById(id);
  if (board === null) {
    throw new NotFoundError(`Board with id ${id} not found`);
  }
  return board;
};

const getAllBoardData = async boardId => {
  const boardData = await getBoardById(boardId);
  return boardData;
}

const createBoard = async newBoardData => {
  const { admin } = newBoardData;
  const newBoard = await Board.create({
    ...newBoardData
  });

  newBoard.userList.push(admin);

  return newBoard;
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

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumnToBoard,
  getAllBoardData
};
