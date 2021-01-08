const User = require('./user.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const UsersData = [
  new User({ id: '1', name: 'Masha', login: 'masha', passwold: '122345n' }),
  new User({ id: '2', name: 'Sasha', login: 'sasha', passwold: '1334s' }),
  new User({ id: '3', name: 'Pasha', login: 'pasha', passwold: '1777p' }),
  new User()
];

const findById = async id => {
  return UsersData.find(user => {
    return user.id === id;
  });
};

const getAll = async () => {
  return UsersData;
};

const getUserById = async id => {
  const user = await findById(id);
  if (user === undefined) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return user;
};

const createUser = async newUser => {
  UsersData.push(newUser);
  return newUser;
};

const updateUser = async (id, dataForUpdate) => {
  const findUser = await findById(id);
  if (findUser === undefined) {
    throw new NotFoundError(`User with id ${id} not found`);
  } else {
    const updatedUser = {
      ...findUser,
      ...dataForUpdate
    };
    const index = UsersData.indexOf(findUser);
    UsersData[index] = updatedUser;
    return updatedUser;
  }
};

const deleteUser = async id => {
  const deletedUser = await findById(id);
  if (deletedUser === undefined) {
    throw new NotFoundError(`User with id ${id} not found`);
  } else {
    const index = UsersData.indexOf(deletedUser);
    UsersData.splice(index, 1);
  }

  return deletedUser;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
