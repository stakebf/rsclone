const todosRepo = require('./todos.db.repository');
const taskService = require('../tasks/task.service');

const getAll = taskId => todosRepo.getAll(taskId);

const getTodosById = (id, taskId) => todosRepo.getTodosById(id, taskId);

const updateTodos = async (id, taskId, param) => {
  const updated = await todosRepo.updateTodos(id, taskId, param);
  const allTodos = await todosRepo.getAll(taskId);
  await taskService.addTodoToTask(taskId, allTodos);
  return updated;
}

const deleteTodos = async (id, taskId) => {
  await todosRepo.deleteTodos(id, taskId);
  const allTodos = await todosRepo.getAll(taskId);
  await taskService.addTodoToTask(taskId, allTodos);
}

const deleteTodoItem = async (id, itemId, taskId) => {
  const updatedTodos = await todosRepo.deleteTodoItem(id, itemId);
  const allTodos = await todosRepo.getAll(taskId);
  await taskService.addTodoToTask(taskId, allTodos);
  return updatedTodos;
}

const deleteTodosFromTask = async taskId => todosRepo.deleteTodosFromTask(taskId);

const unassignTodos = userId => todosRepo.unassignTodos(userId);

const createTodos = async (taskId, param) => {
  const newTodos = await todosRepo.createTodos(taskId, param);
  const allTodos = await todosRepo.getAll(taskId);
  await taskService.addTodoToTask(taskId, allTodos);
  return newTodos;
}

const createTodoItem = async (id, taskId, param) => {
  const todoItem = await todosRepo.createTodoItem(id, taskId, param);
  const allTodos = await todosRepo.getAll(taskId);
  await taskService.addTodoToTask(taskId, allTodos);
  return todoItem;
}

const updateTodoItem = async (todoItemId, data, taskId) => {
  const updatedTodoItem = await todosRepo.updateTodoItem(todoItemId, data);
  const allTodos = await todosRepo.getAll(taskId);
  await taskService.addTodoToTask(taskId, allTodos);
  return updatedTodoItem;
}

module.exports = {
  getAll,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos,
  unassignTodos,
  createTodos,
  createTodoItem,
  deleteTodosFromTask,
  updateTodoItem,
  deleteTodoItem
};
