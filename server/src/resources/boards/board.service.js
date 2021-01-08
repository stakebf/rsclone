const boardsRepo = require('./board.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getBoardById = id => boardsRepo.getBoardById(id);

const createBoard = board => boardsRepo.createBoard(board);

const updateBoard = (id, param) => boardsRepo.updateBoard(id, param);

const deleteBoard = async id => {
  await taskService.deleteTaskfromBoard(id);
  return boardsRepo.deleteBoard(id);
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
