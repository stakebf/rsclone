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

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
