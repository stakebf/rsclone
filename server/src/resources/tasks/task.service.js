const tasksRepo = require('./task.db.repository');
const columnService = require('../columns/column.service');

const getAll = columnId => tasksRepo.getAll(columnId);

const getTaskById = (id, columnId) => tasksRepo.getTaskById(id, columnId);

const createTask = async (task) => tasksRepo.createTask(task);

const updateTask = (id, param) => tasksRepo.updateTask(id, param);

const deleteTask = (id, columnId) => tasksRepo.deleteTask(id, columnId);

const deleteTaskFromColumn = columnId => tasksRepo.deleteTaskFromColumn(columnId);

const unassignTask = userId => tasksRepo.unassignTask(userId);

const addTodoToTask = async (id, params) => {
  const updatedTask = await tasksRepo.addTodoToTask(id, params);
  const { columnId } = updatedTask;
  await columnService.updateTaskOnColumn(columnId, id, updatedTask);
  return updatedTask;
}

const addCommentToTask = async (id, comment) => {
  const updatedTask = await tasksRepo.addCommentToTask(id, comment);
  const { columnId } = updatedTask;
  await columnService.updateTaskOnColumn(columnId, id, updatedTask);
}

const addTagToTask = async (id, tag) => {
  const updatedTask = await tasksRepo.addTagToTask(id, tag);
  const { columnId } = updatedTask;
  await columnService.updateTaskOnColumn(columnId, id, updatedTask);
}

const updateCommentInTask = async (commentId, data) => {
  const updatedTask = await tasksRepo.updateCommentInTask(commentId, data);
  const { columnId, id } = updatedTask;
  await columnService.updateTaskOnColumn(columnId, id, updatedTask);
}

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
  updateCommentInTask,
  addTagToTask
};
