const commentRepo = require('./comments.db.repository');

const getAll = taskId => commentRepo.getAll(taskId);

const getCommentById = (id, taskId) => commentRepo.getCommentById(id, taskId);

const createComment = async (taskId, newComment) => await commentRepo.createComment(taskId, newComment);

const updateComment = (id, taskId, param) => commentRepo.updateComment(id, taskId, param);

const deleteComment = (id, taskId) => commentRepo.deleteComment(id, taskId);

const deleteCommentFromTask = (taskId) => commentRepo.deleteCommentFromTask(taskId);

module.exports = {
  getAll,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  deleteCommentFromTask
};
