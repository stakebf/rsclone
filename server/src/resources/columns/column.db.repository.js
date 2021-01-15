const Column = require('./column.model');
const NotFoundError = require('../../errors/NotFoundError');

const findByBoardId = boardId => {
  return Column.find({ boardId });
};

const getAll = async boardId => {
  return findByBoardId(boardId);
};

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

module.exports = {
  getAll,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn
};
