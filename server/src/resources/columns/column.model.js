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
  const { id, title, order, taskList, boardId } = column;
  return { id, title, order, taskList, boardId };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
