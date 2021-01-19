const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    userList: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns, userList } = board;
  return { id, title, columns, userList };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
