const User = require('../resources/users/user.model');

const usersData = [
  new User({ name: 'admin', login: 'admin', password: 'admin' })
];

module.exports = usersData;
