const todosRepo = require('./todos.db.repository');
const taskService = require('../tasks/task.service');


const getAll = taskId => todosRepo.getAll(taskId);

const getTaskById = (id, taskId) => todosRepo.getTaskById(id, taskId);

const createTask = async (task, taskId) => {
  const newTask = todosRepo.createTask(task);
  const alltodosOnColumn = await todosRepo.getAll(taskId);
  columnService.addTaskToColumn(taskId, alltodosOnColumn);
  return newTask;


}

const updateTask = (id, taskId, param) =>
  todosRepo.updateTask(id, taskId, param);

const deleteTask = (id, taskId) => todosRepo.deleteTask(id, taskId);

const deleteTaskFromColumn = taskId => todosRepo.deleteTaskFromColumn(taskId);

const unassignTask = userId => todosRepo.unassignTask(userId);

const createTodos = async (taskId, param) => {
  const newTodos = todosRepo.createTodos(taskId, param);
  const allTodos = await todosRepo.getAll(taskId);
  await taskService.addTodoToTask(taskId, allTodos);
  return newTodos;
}

const createTodoItem = (id, taskId, param) =>
  todosRepo.createTodoItem(id, taskId, param);

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  unassignTask,
  deleteTaskFromColumn,
  createTodos,
  createTodoItem
};
