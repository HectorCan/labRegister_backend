const {
  User,
  Laboratory,
  Transaction } = require('../Models');

const UserController = require('./User')(User);
const LaboratoryController = require('./Laboratory')(Laboratory);

module.exports = (io) => {
  const TransactionController = require('./Transaction')(Transaction, User, Laboratory, io);

  return {
    UserController,
    LaboratoryController,
    TransactionController
  }
}
