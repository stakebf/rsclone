const tasksRepo = require('./task.db.repository');
const columnService = require('../columns/column.service');

const getAll = columnId => tasksRepo.getAll(columnId);

const getTaskById = (id, columnId) => tasksRepo.getTaskById(id, columnId);

const createTask = async (task, columnId) => {
  const newTask = tasksRepo.createTask(task);
  const allTasksOnColumn = await tasksRepo.getAll(columnId);
  await columnService.addTaskToColumn(columnId, allTasksOnColumn);
  return newTask;
}

const updateTask = (id, columnId, param) =>
  tasksRepo.updateTask(id, columnId, param);

const deleteTask = (id, columnId) => tasksRepo.deleteTask(id, columnId);

const deleteTaskFromColumn = columnId => tasksRepo.deleteTaskFromColumn(columnId);

const unassignTask = userId => tasksRepo.unassignTask(userId);

const addTodoToTask = async (id, params) => {
  const upDatedTask = await tasksRepo.addTodoToTask(id, params);
  const { columnId } = upDatedTask;
  const allTasksOnColumn = await tasksRepo.getAll(columnId);
  await columnService.addTaskToColumn(columnId, allTasksOnColumn);
  return upDatedTask;
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
