const boardsRepo = require('./board.db.repository');
// const columnsService = require('../columns/column.service');
// const taskService = require('../tasks/task.service');

// const userService = require('../users/user.service');


const getAll = async () => await boardsRepo.getAll();

const getBoardById = id => boardsRepo.getBoardById(id);

const createBoard = async board => {
  const newBoard = await boardsRepo.createBoard(board);
  // console.log(newBoard, 'newBoard', userService);
  return newBoard;
};

const updateBoard = (id, param) => boardsRepo.updateBoard(id, param);

const addColumnToBoard = (id, param) => boardsRepo.addColumnToBoard(id, param);

const deleteBoard = async id => {
  // await columnsService.deleteColumnFromBoard(id);
  return boardsRepo.deleteBoard(id);
};

const getAllBoardData = async boardId => {
  // const columns = await columnsService.getAll(boardId);
  // await boardsRepo.addColumnToBoard(boardId, columns);
  return boardsRepo.getAllBoardData(boardId);
}

const addUserToList =  (boardId, user) => {
  const { name, login, id } = user;
  return boardsRepo.addUserToList(boardId, { name, login, id });
}

const updateColumnData = async (id, columnId, data) => await boardsRepo.updateColumnData(id, columnId, data)

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumnToBoard,
  getAllBoardData,
  addUserToList,
  updateColumnData
};
