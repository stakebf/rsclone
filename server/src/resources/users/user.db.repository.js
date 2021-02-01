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
      $addToSet: {
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
      $addToSet: {
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

const deleteUserFromTaskList = async (id, taskId) => {
  const updatedUser = await User.findByIdAndUpdate(id, {
    '$pull':
    {
      tasks: taskId
    }
  }, {
    new: true
  });

  console.log(updatedUser, 'updatedUser', taskId)
  if (updatedUser === null) {
    throw new NotFoundError(`Task with id ${taskId} not found`);
  }
  return updatedUser;
}

const deleteUserFromBoardList = async (id, boardId) => {
  const updatedUser = await User.findByIdAndUpdate(id, {
    '$pull':
    {
      boards: boardId
    }
  }, {
    new: true
  });
  if (updatedUser === null) {
    throw new NotFoundError(`Task with id ${taskId} not found`);
  }
  return updatedUser;
}


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
  addTaskToUser,
  deleteUserFromTaskList,
  deleteUserFromBoardList
};
