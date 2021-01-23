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
