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


const addTaskToColumn = async (id, taskData, position) => {
  let updateColumn;
  if (!position) {
    updateColumn = await Column.findByIdAndUpdate(id, {
      $push: {
        taskList: taskData
      }
    }, {
      new: true
    });
  } else {
    updateColumn = await Column.findByIdAndUpdate(id, {
      $push: {
        taskList: {
          $each: taskData,
          $position: position
        }
      }
    }, {
      new: true
    });
  }

  if (updateColumn === null) {
    throw new NotFoundError(`Column with id ${id} not found`);
  }
  return updateColumn;
};

const deleteTaskFromColumn = async (id, taskId) => {
  const updateColumn = await Column.findByIdAndUpdate(id, {
    '$pull':
    {
      taskList: {
        _id: taskId
      }
    }
  }, {
    new: true
  });
  if (updateColumn === null) {
    throw new NotFoundError(`Column with id ${id} not found`);
  }
  return updateColumn;
}

const updateTaskOnColumn = async (id, taskId, data) => {
  const updatedBoard = await Column.findOneAndUpdate({
    'taskList._id': taskId
  }, {
    '$set': {
      'taskList.$': data,
    }
  }, {
    new: true
  });
  if (updatedBoard === null) {
    throw new NotFoundError(`Task with id ${taskId} on column not found`);
  }
  return updatedBoard;
}

// const updateTaskOnColumn = async (id, taskId, data) => {
//   const updatedBoard = await Column.findOneAndUpdate({
//     'taskList._id': taskId
//   }, {
//     '$set': {
//       'taskList.$': data,
//     }
//   }, {
//     new: true
//   });
//   if (updatedBoard === null) {
//     throw new NotFoundError(`Task with id ${taskId} on column not found`);
//   }
//   return updatedBoard;
// }

module.exports = {
  getAll,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn,
  deleteColumnFromBoard,
  addTaskToColumn,
  updateTaskOnColumn,
  deleteTaskFromColumn
};
