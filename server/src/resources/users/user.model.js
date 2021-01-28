const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String,
    boards: Array,
    tasks: Array
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login, boards, tasks } = user;
  return { id, name, login, boards, tasks };
};

const User = mongoose.model('User', userSchema);
module.exports = User;
