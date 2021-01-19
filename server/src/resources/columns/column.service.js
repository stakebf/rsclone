const columnsRepo = require('./column.db.repository');
const taskService = require('../tasks/task.service');
// const boardService = require('../boards/board.service');

const getAll = boardId => {
  console.log(boardId, 'INTO GET ALL')
  return columnsRepo.getAll(boardId);
}

const getColumnById = id => columnsRepo.getColumnById(id);

const createColumn = async (column, boardId) => {
  const newColumn = await columnsRepo.createColumn(column, boardId);
  // const allColumnsOnBoard = await columnsRepo.getAll(boardId);
  // console.log(allColumnsOnBoard, 'allColumnsOnBoard')
  // boardService.addColumnToBoard(boardId, allColumnsOnBoard)
  return newColumn;
}

const updateColumn = (id, param) => columnsRepo.updateColumn(id, param);

const deleteColumn = async (id, boardId) => {
  const deletedColumn = columnsRepo.deleteColumn(id);
  await taskService.deleteTaskfromColumn(id);
  // const allColumnsOnBoard = await columnsRepo.getAll(boardId);
  // boardService.addColumnToBoard(boardId, allColumnsOnBoard)
  return deletedColumn;
};

const deleteColumnFromBoard = async boardId => columnsRepo.deleteColumnFromBoard(boardId);

const addTaskToColumn = (id, params) => columnsRepo.addTaskToColumn(id, params);

module.exports = {
  getAll,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn,
  deleteColumnFromBoard,
  addTaskToColumn
};
