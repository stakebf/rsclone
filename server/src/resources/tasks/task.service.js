const tasksRepo = require('./task.db.repository');
const columnService = require('../columns/column.service');

const getAll = columnId => tasksRepo.getAll(columnId);

const getTaskById = (id, columnId) => tasksRepo.getTaskById(id, columnId);

const createTask = async (task) => tasksRepo.createTask(task);

const updateTask = (id, param) => tasksRepo.updateTask(id, param);

const deleteTask = (id, columnId) => tasksRepo.deleteTask(id, columnId);

const deleteTaskFromColumn = columnId => tasksRepo.deleteTaskFromColumn(columnId);

const deleteFieldItemFromTask = async (id, fieldId, fieldName) => {
  const updatedTask = await tasksRepo.deleteFieldItemFromTask(id, fieldId, fieldName);
  const { columnId } = updatedTask;
  await columnService.updateTaskOnColumn(columnId, id, updatedTask);
}

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

const addUserToList = async (taskId, user) => {
  const { name, login, id } = user;
  const updatedTask = await tasksRepo.addUserToList(taskId, { name, login, id });
  await columnService.updateTaskOnColumn(updatedTask.columnId, taskId, updatedTask);
  return updatedTask;

}

const updateCommentInTask = async (commentId, data) => {
  const updatedTask = await tasksRepo.updateCommentInTask(commentId, data);
  const { columnId, id } = updatedTask;
  await columnService.updateTaskOnColumn(columnId, id, updatedTask);
}

const updateTagsInTask = async (tagId, data) => {
  const updatedTask = await tasksRepo.updateTagsInTask(tagId, data);
  const { columnId, id } = updatedTask;
  await columnService.updateTaskOnColumn(columnId, id, updatedTask);
}


const deleteUserFromTaskList = async (id, userId) => {
 const updatedTask = await tasksRepo.deleteUserFromTaskList(id, userId);
  const { columnId } = updatedTask;
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
  addTagToTask,
  addUserToList,
  deleteFieldItemFromTask,
  updateTagsInTask,
  deleteUserFromTaskList
};
