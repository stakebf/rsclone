const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    boardId: String,
    _id: {
      type: String,
      default: uuid
    },
    taskList: Array,
  },
  { versionKey: false }
);

columnSchema.statics.toResponse = column => {
  const { _id, title, order, taskList, boardId } = column;
  return { _id, title, order, taskList, boardId };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
