const tasksRepo = require('./task.db.repository');
const columnService = require('../columns/column.service');

const getAll = columnId => tasksRepo.getAll(columnId);

const getTaskById = (id, columnId) => tasksRepo.getTaskById(id, columnId);

const createTask = async (task) =>  tasksRepo.createTask(task);

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

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  unassignTask,
  deleteTaskFromColumn,
  addTodoToTask
};
