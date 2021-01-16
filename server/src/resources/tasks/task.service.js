const tasksRepo = require('./task.db.repository');
const columnService = require('../columns/column.service');


const getAll = columnId => tasksRepo.getAll(columnId);

const getTaskById = (id, columnId) => tasksRepo.getTaskById(id, columnId);

const createTask = async (task, columnId) => {
  const newTask = tasksRepo.createTask(task);
  const allTasksOnColumn = await tasksRepo.getAll(columnId);
  console.log(allTasksOnColumn, 'allTasksOnColumn');
  columnService.addTaskToColumn(columnId, allTasksOnColumn);
  return newTask;


}

const updateTask = (id, columnId, param) =>
  tasksRepo.updateTask(id, columnId, param);

const deleteTask = (id, columnId) => tasksRepo.deleteTask(id, columnId);

const deleteTaskFromColumn = columnId => tasksRepo.deleteTaskFromColumn(columnId);

const unassignTask = userId => tasksRepo.unassignTask(userId);

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  unassignTask,
  deleteTaskFromColumn
};
