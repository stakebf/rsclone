const tagRepo = require('./tags.db.repository');

const getAll = taskId => tagRepo.getAll(taskId);

const getTagById = (id, taskId) => tagRepo.getTagById(id, taskId);

const createTag = async (taskId, newTag) => await tagRepo.createTag(taskId, newTag);

const updateTag = (id, taskId, param) => tagRepo.updateTag(id, taskId, param);

const deleteTag = (id, taskId) => tagRepo.deleteTag(id, taskId);

const deleteTagFromTask = (taskId) => tagRepo.deleteTagFromTask(taskId);

module.exports = {
  getAll,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  deleteTagFromTask
};
