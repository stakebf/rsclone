const columnsRepo = require('./column.db.repository');
const taskService = require('../tasks/task.service');
const boardService = require('../boards/board.service');

const getAll = boardId => {
  return columnsRepo.getAll(boardId);
}

const getColumnById = id => columnsRepo.getColumnById(id);

const createColumn = async (column, boardId) => {
  const newColumn = await columnsRepo.createColumn(column, boardId);
  // const allColumnsOnBoard = await columnsRepo.getAll(boardId);
  await boardService.addColumnToBoard(boardId, newColumn);
  return newColumn;
}

const updateColumn = async (id, param) => {
  const updatedColumn = await columnsRepo.updateColumn(id, param);
  await boardService.updateColumnData(updatedColumn.boardId, id, updatedColumn);
  return updatedColumn;
}

const deleteColumn = async (id, boardId) => {
  const deletedColumn = columnsRepo.deleteColumn(id);
  await taskService.deleteTaskfromColumn(id);
  // const allColumnsOnBoard = await columnsRepo.getAll(boardId);
  // boardService.addColumnToBoard(boardId, allColumnsOnBoard)
  return deletedColumn;
};

const deleteColumnFromBoard = async boardId => columnsRepo.deleteColumnFromBoard(boardId);

const addTaskToColumn = async (id, params) => {
  const updatedColumn = await columnsRepo.addTaskToColumn(id, params);
  await boardService.updateColumnData(updatedColumn.boardId, id, updatedColumn);
}

module.exports = {
  getAll,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn,
  deleteColumnFromBoard,
  addTaskToColumn
};
