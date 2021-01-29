const NotFoundError = require('../../errors/NotFoundError');
const Tag = require('./tags.model');

const findByTaskId = taskId => {
  return Tag.find({ taskId });
};

const getAll = async taskId => {
  const tagsOnTask = findByTaskId(taskId);
  if (tagsOnTask === null) {
    throw new NotFoundError(`Task with  id ${taskId} has no tags`);
  }
  return tagsOnTask;
};

const getTagById = async (id, taskId) => {
  const tag = await Tag.findOne({ _id: id, taskId });
  if (tag === null) {
    throw new NotFoundError(`Tag with id ${id} not found`);
  }
  return tag;
};

const createTag = (taskId, newTag) => {
  return Tag.create({
    ...newTag,
    taskId
  });

};

const updateTag = async (id, taskId, dataForUpdate) => {
  const findedTag = await Tag.findOneAndUpdate(
    { _id: id, taskId },
    dataForUpdate,
    {
      new: true
    }
  );
  if (findedTag === null) {
    throw new NotFoundError(`Tag with id ${id} not found`);
  }
  return findedTag;
};


const deleteTag = async (id, taskId) => {
  const tags = await findByTaskId(taskId);
  if (tags.length === 0) {
    throw new NotFoundError(`Tag with taskId ${taskId} not found`);
  } else {
    const isDeleted = (await Tag.deleteOne({ _id: id, taskId })).deletedCount;
    if (isDeleted === 0) {
      throw new NotFoundError(`Tag with id ${id} not found`);
    }
  }
  return tags;
};

const deleteTagFromTask = async taskId => {
  const deletedTag = await findByTaskId(taskId);
  // if (deletedTag.length === 0) {
  //   return;
  //   // throw new NotFoundError(`Tag with taskId ${taskId} not found`);
  // } else {
    if (deletedTag.length !== 0) {
      await Tag.deleteMany({ taskId });
      return deletedTag;
    }
  // }
  return [];
};

module.exports = {
  getAll,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  deleteTagFromTask
};
