const { use } = require('../tags/tags.router');
const boardsRepo = require('./board.db.repository');

const getAll = async () => await boardsRepo.getAll();

const getBoardById = id => boardsRepo.getBoardById(id);

const createBoard = async board => {
  const newBoard = await boardsRepo.createBoard(board);
  return newBoard;
};

const updateBoard = (id, param) => boardsRepo.updateBoard(id, param);

const addColumnToBoard = (id, param) => boardsRepo.addColumnToBoard(id, param);

const deleteBoard = async id => {
  return boardsRepo.deleteBoard(id);
};

const getAllBoardData = async boardId => {
  return boardsRepo.getAllBoardData(boardId);
}

const addUserToList = (boardId, user) => {
  const { name, login, id } = user;
  return boardsRepo.addUserToList(boardId, { name, login, id });
}

const updateColumnData = async (id, columnId, data) => await boardsRepo.updateColumnData(id, columnId, data);

const deleteColumnFromBoard = async (id, columnId) => await boardsRepo.deleteColumnFromBoard(id, columnId);

const deleteUserFromBoardList = async (id, userId) => await boardsRepo.deleteUserFromBoardList(id, userId);

const findAllBoardOnUser = async (userId) => await boardsRepo.findAllBoardOnUser(userId);

const updateUserData = async userData => {
  const { name, login, id } = userData;
  await boardsRepo.updateUserData({ name, login, id });
}

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumnToBoard,
  getAllBoardData,
  addUserToList,
  updateColumnData,
  deleteColumnFromBoard,
  deleteUserFromBoardList,
  findAllBoardOnUser,
  updateUserData
};
