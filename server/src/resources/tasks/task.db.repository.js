const Task = require('./task.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const findByUserId = async userId => {
  const taskByUser = Task.find({ userId });
  const task = await Task.updateMany({ taskByUser, userId: null });
  return task;
};

const findByBoardId = boardId => {
  return Task.find({ boardId });
};

const getAll = async boardId => {
  return findByBoardId(boardId);
};

const getTaskById = async (id, boardId) => {
  const taskOnBoard = await Task.findOne({ _id: id, boardId });
  if (taskOnBoard === null) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return taskOnBoard;
};

const createTask = async newTask => {
  return Task.create(newTask);
};

const updateTask = async (id, boardId, dataForUpdate) => {
  const findTask = await Task.findOneAndUpdate(
    { _id: id, boardId },
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

const deleteTask = async (id, boardId) => {
  const boardTask = await findByBoardId(boardId);
  if (boardTask.length === 0) {
    throw new NotFoundError(`Task with boardId ${boardId} not found`);
  } else {
    const isDeleted = (await Task.deleteOne({ _id: id, boardId })).deletedCount;
    if (isDeleted === 0) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
  }
  return boardTask;
};

const deleteTaskfromBoard = async boardId => {
  const deletedTask = await findByBoardId(boardId);
  if (deletedTask.length !== 0) {
    await Task.deleteMany({ boardId });
    return deletedTask;
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
  deleteTaskfromBoard,
  unassignTask
};
