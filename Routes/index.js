const UserRoutes = require('./UserRoutes');
const LaboratoryRoutes = require('./LaboratoryRoutes');
const TransactionRoutes = require('./TransactionRoutes');


module.exports = (app, io) => {
  const {
    UserController,
    LaboratoryController,
    TransactionController
  } = require('../Controllers')(io);

  app.use('/user', UserRoutes(UserController));
  app.use('/laboratory', LaboratoryRoutes(LaboratoryController));
  app.use('/transaction', TransactionRoutes(TransactionController));

  return app;
};
