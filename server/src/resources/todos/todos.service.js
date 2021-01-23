const todosRepo = require('./todos.db.repository');
const taskService = require('../tasks/task.service');

const getAll = taskId => todosRepo.getAll(taskId);

const getTodosById = (id, taskId) => todosRepo.getTodosById(id, taskId);

const updateTodos = async (id, taskId, param) => {
  const updated = await todosRepo.updateTodos(id, taskId, param);
  return updated;
}

const deleteTodos = (id, taskId) => todosRepo.deleteTodos(id, taskId);

// const deleteTaskFromColumn = taskId => todosRepo.deleteTaskFromColumn(taskId);

const unassignTodos = userId => todosRepo.unassignTodos(userId);

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
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos,
  unassignTodos,
  createTodos,
  createTodoItem
};
