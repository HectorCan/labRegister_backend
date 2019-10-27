const express = require('express');
const UserRoutes = require('./UserRoutes');
const LaboratoryRoutes = require('./LaboratoryRoutes');
const TransactionRoutes = require('./TransactionRoutes');
const {
  UserController,
  LaboratoryController,
  TransactionController
} = require('../Controllers');

module.exports = (app) => {
  var router = express.Router();

  app.use('/user', UserRoutes(router, UserController));
  app.use('/laboratory', LaboratoryRoutes(router, LaboratoryController));
  app.use('/transaction', TransactionRoutes(router, TransactionController));

  return app;
};
