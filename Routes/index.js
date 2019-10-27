const UserRoutes = require('./UserRoutes');
const LaboratoryRoutes = require('./LaboratoryRoutes');
const TransactionRoutes = require('./TransactionRoutes');
const {
  UserController,
  LaboratoryController,
  TransactionController
} = require('../Controllers');

module.exports = (app) => {
  app.use('/user', UserRoutes(UserController));
  app.use('/laboratory', LaboratoryRoutes(LaboratoryController));
  app.use('/transaction', TransactionRoutes(TransactionController));

  return app;
};
