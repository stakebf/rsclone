const User = require('./user.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const getAll = async () => {
  return User.find({});
};

const getUserById = async id => {
  const user = await User.findById(id);
  if (user === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return user;
};

const getUserByProps = async login => {
  const user = await User.findOne({ login });
  return user;
};

const createUser = async newUser => {
  return User.create(newUser);
};

const updateUser = async (id, dataForUpdate) => {
  const updatedUser = await User.findByIdAndUpdate(id, dataForUpdate, {
    new: true
  });
  if (updatedUser === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return updatedUser;
};

const addBoardToUser = async (id, boardId) => {
  const findedUser = await User.findOneAndUpdate(
    { _id: id },
    {
          $push: {
            boards: boardId
          }
    },
    {
      new: true
    }
  );
  if (findedUser === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return findedUser;
};

const addTaskToUser = async (id, taskId) => {
  const findedUser = await User.findOneAndUpdate(
    { _id: id },
    {
          $push: {
            tasks: taskId
          }
    },
    {
      new: true
    }
  );
  if (findedUser === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return findedUser;
};



const deleteUser = async id => {
  const deletedUser = await User.findOneAndDelete({ _id: id });
  if (deletedUser === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return deletedUser;
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByProps,
  addBoardToUser,
  addTaskToUser
};
