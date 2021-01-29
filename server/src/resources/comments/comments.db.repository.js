const NotFoundError = require('../../errors/NotFoundError');
const Comment = require('./comments.model');

const findByTaskId = taskId => {
  return Comment.find({ taskId });
};

const getAll = async taskId => {
  const commentsOnTask = findByTaskId(taskId);
  if (commentsOnTask === null) {
    throw new NotFoundError(`Task with  id ${taskId} has no comment`);
  }
  return commentsOnTask;
};

const getCommentById = async (id, taskId) => {
  const commentsOnComment = await Comment.findOne({ _id: id, taskId });
  if (commentsOnComment === null) {
    throw new NotFoundError(`Comment with id ${id} not found`);
  }
  return commentsOnComment;
};

const createComment = (taskId, newComment) => {
  return Comment.create({
    ...newComment,
    taskId
  });

};

const updateComment = async (id, taskId, dataForUpdate) => {
  const findComment = await Comment.findOneAndUpdate(
    { _id: id, taskId },
    dataForUpdate,
    {
      new: true
    }
  );
  if (findComment === null) {
    throw new NotFoundError(`Comment with id ${id} not found`);
  }
  return findComment;
};


const deleteComment = async (id, taskId) => {
  const CommentComment = await findByTaskId(taskId);
  if (CommentComment.length === 0) {
    throw new NotFoundError(`Comment with taskId ${taskId} not found`);
  } else {
    const isDeleted = (await Comment.deleteOne({ _id: id, taskId })).deletedCount;
    if (isDeleted === 0) {
      throw new NotFoundError(`Comment with id ${id} not found`);
    }
  }
  return CommentComment;
};

const deleteCommentFromTask = async taskId => {
  const deletedComment = await findByTaskId(taskId);
  // if (deletedComment.length === 0) {
  //   return;
  //   // throw new NotFoundError(`Comment with taskId ${taskId} not found`);
  // } else {
    if (deletedComment.length !== 0) {
      await Comment.deleteMany({ taskId });
      return deletedComment;
    }
  // }
  return [];
};



// const unassignComment = async userId => {
//   return findByUserId(userId);
// };

module.exports = {
  getAll,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  // unassignComment,
  deleteCommentFromTask,
  createComment,
  // createTodoItem
};
