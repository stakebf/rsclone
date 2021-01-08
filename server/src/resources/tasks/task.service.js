const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getTaskById = (id, boardId) => tasksRepo.getTaskById(id, boardId);

const createTask = task => tasksRepo.createTask(task);

const updateTask = (id, boardId, param) =>
  tasksRepo.updateTask(id, boardId, param);

const deleteTask = (id, boardId) => tasksRepo.deleteTask(id, boardId);

const deleteTaskfromBoard = boardId => tasksRepo.deleteTaskfromBoard(boardId);

const unassignTask = userId => tasksRepo.unassignTask(userId);

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTaskfromBoard,
  unassignTask
};
