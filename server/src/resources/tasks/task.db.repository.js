const Task = require('./task.model.js');

const NotFoundError = require('../../errors/NotFoundError');

const findByUserId = async userId => {
  const taskByUser = Task.find({ userId });
  const task = await Task.updateMany({ taskByUser, userId: null });
  return task;
};

const findByColumnId = columnId => {
  return Task.find({ columnId });
};

const getAll = async columnId => {
  const tasksOnColumn = findByColumnId(columnId);
  if (tasksOnColumn === null) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return tasksOnColumn;
};

const getTaskById = async (id, columnId) => {
  const taskOnColumn = await Task.findOne({ _id: id, columnId });
  if (taskOnColumn === null) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return taskOnColumn;
};

const createTask = newTask => {
  return Task.create(newTask);

};

const updateTask = async (id, dataForUpdate) => {
  const findTask = await Task.findByIdAndUpdate(id,
    dataForUpdate,
    {
      new: true
    }
  );
  if (findTask === null) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return findTask;
};


const addCommentToTask = async (id, comment) => {
  const updateColumn = await Task.findByIdAndUpdate(id, {
    $push: {
      comments: comment
    }
  }, {
    new: true
  });
  if (updateColumn === null) {
    throw new NotFoundError(`Column with id ${id} not found`);
  }
  return updateColumn;
};

const updateCommentInTask = async (commentId, data) => {
  const updatedBoard = await Task.findOneAndUpdate({
    'comments._id': commentId
  }, {
    '$set': {
      'comments.$': data,
    }
  }, {
    new: true
  });
  if (updatedBoard === null) {
    throw new NotFoundError(`Task with id ${taskId} on column not found`);
  }
  return updatedBoard;
}


const deleteTask = async (id, columnId) => {
  const columnTask = await findBycolumnId(columnId);
  if (columnTask.length === 0) {
    throw new NotFoundError(`Task with columnId ${columnId} not found`);
  } else {
    const isDeleted = (await Task.deleteOne({ _id: id, columnId })).deletedCount;
    if (isDeleted === 0) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
  }
  return columnTask;
};

const deleteTaskFromColumn = async columnId => {
  const deletedTask = await findByColumnId(columnId);
  if (deletedTask.length === 0) {
    throw new NotFoundError(`Task with columnId ${columnId} not found`);
  } else {
    if (deletedTask.length !== 0) {
      await Task.deleteMany({ columnId });
      return deletedTask;
    }
  }
  return [];
};

const unassignTask = async userId => {
  return findByUserId(userId);
};

const addTodoToTask = async (id, todosData) => {
  const updatedTask = await Task.findByIdAndUpdate(id, {
    todos: todosData
  }, {
    new: true
  });
  if (updatedTask === null) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return updatedTask;
};


module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  unassignTask,
  deleteTaskFromColumn,
  addTodoToTask,
  addCommentToTask,
  updateCommentInTask
};
