const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userList: Array,
    columnId: String,
    todos: Object,
    comments: Array,
    date: String,
    tags: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userList, columnId, todos, comments, date, tags } = task;
  return { id, title, order, description, userList, columnId, todos, comments, date, tags };
};

taskSchema.statics.fromRequest = (columnId, requestData) => {
  const task = new Task({
    ...requestData,
    todos: {},
    columnId
  });
  return task;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
