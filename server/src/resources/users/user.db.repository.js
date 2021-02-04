const User = require('./user.model.js');
const NotFoundError = require('../../errors/NotFoundError');
const ConflictError = require('../../errors/ConflictError');

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
  const { login } = dataForUpdate;
  if (login) {
    const isLoginExist = await getUserByProps(login);
    if (isLoginExist) {
      throw new ConflictError(`User with login ${login} already exist`);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(id, dataForUpdate, {
    new: true
  });
  if (updatedUser === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return updatedUser;
};

const addBoardToUser = async (id, boardData) => {
  const findedUser = await User.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: {
        boards: boardData
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

const updateBoardOnUser = async boardData => {
  const { id, name } = boardData;
  const updatedUser = await User.updateMany({
    'boards.id': id
  },
    {
      '$set': {
        'boards.$.name': name
      }
    }
    , {
      new: true
    });
  return updatedUser;
}

const deleteUserFromTaskList = async (id, taskId) => {
  const updatedUser = await User.findByIdAndUpdate(id, {
    '$pull':
    {
      tasks: taskId
    }
  }, {
    new: true
  });

  if (updatedUser === null) {
    throw new NotFoundError(`Task with id ${taskId} not found`);
  }
  return updatedUser;
}

const deleteUserFromBoardList = async (id, boardId) => {
  const updatedUser = await User.findByIdAndUpdate(id, {
    '$pull':
    {
      boards: {
        id: boardId
      }
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
  deleteUserFromBoardList,
  updateBoardOnUser
};
