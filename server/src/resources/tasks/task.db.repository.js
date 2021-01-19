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
  console.log(tasksOnColumn, 'tasksOnColumn', columnId)
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

const updateTask = async (id, columnId, dataForUpdate) => {
  const findTask = await Task.findOneAndUpdate(
    { _id: id, columnId },
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

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  unassignTask,
  deleteTaskFromColumn
};
