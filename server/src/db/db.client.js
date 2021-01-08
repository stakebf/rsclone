const mongoose = require('mongoose');
const usersData = require('./user.defaultDbData');
const tasksData = require('./tasks.defaultDbData');
const boardsData = require('./boards.defaultDbData');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const userService = require('../resources/users/user.service');

const connectToDb = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log(" we're connected!");
    // await db.dropDatabase();
    // usersData.forEach(user => userService.createUser(user));
    // tasksData.forEach(task => task.save());
    // boardsData.forEach(board => board.save());

    cb();
  });
};

module.exports = connectToDb;
