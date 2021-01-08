const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

columnSchema.statics.toResponse = board => {
  const { id, title, order } = board;
  return { id, title, order };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
