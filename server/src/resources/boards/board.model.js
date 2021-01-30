const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    userList: Array,
    background: String,
    isFavorite: Boolean,
    admin: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns, userList, background, isFavorite, admin } = board;
  return { id, title, columns, userList, background, isFavorite, admin };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
