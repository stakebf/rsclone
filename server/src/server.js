const { PORT } = require('./common/config');
const { logger } = require('./common/logger');
const connectToDb = require('./db/db.client');

process
  .on('uncaughtException', err => {
    logger.error(`Uncaught Exception: ${err.message}`);
    const exit = process.exit;
    exit(1);
  })
  .on('unhandledRejection', err => {
    logger.error(`Unhandled Promise Rejection: ${err.message}`);
    const exit = process.exit;
    exit(1);
  });

const app = require('./app');
const port = PORT || 4000;

connectToDb(() => {
  app.listen(port, () =>
    console.log(`App is running on http://localhost:${port}`)
  );
});
