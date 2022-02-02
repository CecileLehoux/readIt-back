const bookRouter = require('./books');
const userRouter = require('./users');
const ratingRouter = require('./rating');

const setupRoutes = (app) => {
  app.use('/api/books', bookRouter);
  app.use('/api/users', userRouter);
  app.use('/api/rating', ratingRouter);
};

module.exports = {
  setupRoutes,
};
