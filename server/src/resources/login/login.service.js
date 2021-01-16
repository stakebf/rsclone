const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const userService = require('../users/user.service');
const ForbittenError = require('../../errors/ForbittenError');
const bcrypt = require('bcrypt');

const loginUser = async (login, password) => {
  const user = await userService.getUserByProps(login);
  if (user === null) {
    throw new ForbittenError('Bad login/password combination');
  } else {
    const { password: userPassword } = user;
    const isPassword = await bcrypt.compare(password, userPassword);
    if (!isPassword) {
      throw new ForbittenError('Bad login/password combination');
    }
  }
  const payload = { userId: user.id, login };
  const token = await jwt.sign(payload, JWT_SECRET_KEY);
  return {
    token,
    userId
  };
};

const registerUser = async (requestData) => {
  const { id, login } = requestData;
  const user = await userService.getUserByProps(login);
  if (user) {
    throw new ForbittenError('User already exist')
  } else {
    await userService.createUser(requestData);
    const payload = { id, login };
    const token = jwt.sign(payload, JWT_SECRET_KEY);
    return {
      token,
      userId
    };
  }
};

module.exports = { loginUser, registerUser };
