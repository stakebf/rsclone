const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

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
    cb();
  });
};

module.exports = connectToDb;
