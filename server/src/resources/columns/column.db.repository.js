const Column = require('./column.model');
const NotFoundError = require('../../errors/NotFoundError');

const findByBoardId = boardId => {
  return Column.find({ boardId });
};

const getAll = async boardId => {
  return findByBoardId(boardId);
};

// const getAllColumnData = async ()

const getColumnById = async id => {
  const column = await Column.findById(id);
  if (Column === null) {
    throw new NotFoundError(`Column with id ${id} not found`);
  }
  return column;
};

const createColumn = async (newColumn, boardId) => {
  return Column.create({
    ...newColumn,
    boardId: boardId
  });
};

const updateColumn = async (id, dataForUpdate) => {
  const updatedColumn = await Column.findByIdAndUpdate(id, dataForUpdate, {
    new: true
  });
  if (updatedColumn === null) {
    throw new NotFoundError(`Column with id ${id} not found`);
  }
  return updatedColumn;
};

const deleteColumn = async id => {
  const deletedColumn = await Column.findOneAndDelete({ _id: id });
  if (deletedColumn === null) {
    throw new NotFoundError(`Column with id ${id} not found`);
  }
  return deletedColumn;
};

const deleteColumnFromBoard = async boardId => {
  const deletedColumn = await findByBoardId(boardId);
  if (deletedColumn.length !== 0) {
    await Column.deleteMany({ boardId });
    return deletedColumn;
  }
  return [];
};

const addTaskToColumn = async (id, taskData) => {
  const updateColumn = await Column.findByIdAndUpdate(id, {
    taskList: taskData
  }, {
    new: true
  });
  if (updateColumn === null) {
    throw new NotFoundError(`Column with id ${id} not found`);
  }
  return updateColumn;
};

module.exports = {
  getAll,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn,
  deleteColumnFromBoard,
  addTaskToColumn
};
