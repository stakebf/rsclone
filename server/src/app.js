const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const authorizate = require('./common/authorizate');
const errors = require('./errors');
const { requestLogger } = require('./common/logger');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(requestLogger);
app.use(authorizate);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN || '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errors.handleError, (err, req, res, next) => {
  errors.handleInternalError(err, req, res, next);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;
