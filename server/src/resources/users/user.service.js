const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');
const createHash = require('../../common/hashPassword');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const getUserByProps = async login => {
  const user = await usersRepo.getUserByProps(login);
  return user;
};

const createUser = async user => {
  let { password } = user;
  const { name, login } = user;
  password = await createHash(password);
  const updatedUser = { name, login, password };
  return usersRepo.createUser(updatedUser);
};

const updateUser = (id, param) => usersRepo.updateUser(id, param);

const deleteUser = async id => {
  await tasksService.unassignTask(id);
  return usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByProps
};
