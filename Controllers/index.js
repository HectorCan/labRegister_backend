const {
  User,
  Laboratory,
  Transaction } = require('../Models');

const UserController = require('./User')(User);
const LaboratoryController = require('./Laboratory')(Laboratory);
const TransactionController = require('./Transaction')(Transaction, User, Laboratory);

module.exports = {
  UserController,
  LaboratoryController,
  TransactionController
};
