const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: Array,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, columnId } = task;
  return { id, title, order, description, userId, columnId };
};

taskSchema.statics.fromRequest = (columnId, requestData) => {
  const task = new Task({
    ...requestData,
    columnId
  });
  return task;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
