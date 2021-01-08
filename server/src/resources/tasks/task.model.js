const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    columnId: String,
    boardId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, columnId, boardId } = task;
  return { id, title, order, description, userId, columnId, boardId };
};

taskSchema.statics.fromRequest = (boardId, requestData) => {
  const task = new Task({
    ...requestData,
    boardId
  });
  return task;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
