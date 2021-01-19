const boardsRepo = require('./board.db.repository');
const columnsService = require('../columns/column.service');
const taskService = require('../tasks/task.service');


const getAll = () => boardsRepo.getAll();

const getBoardById = id => boardsRepo.getBoardById(id);

const createBoard = board => boardsRepo.createBoard(board);

const updateBoard = (id, param) => boardsRepo.updateBoard(id, param);

const addColumnToBoard = (id, param) => boardsRepo.addColumnToBoard(id, param);

const deleteBoard = async id => {
  await columnsService.deleteColumnFromBoard(id);
  return boardsRepo.deleteBoard(id);
};

const getAllBoardData = async boardId => {
  const columns = await columnsService.getAll(boardId);
 boardsRepo.addColumnToBoard(boardId, columns);
 return boardsRepo.getAllBoardData(boardId);
}

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumnToBoard,
  getAllBoardData
};
