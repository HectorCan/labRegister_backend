const {
  User: UserModel,
  Laboratory: LaboratoryModel,
  Transaction: TransactionModel,
} = require('../Models');

const UserController = require('./User')(UserModel);
const LaboratoryController = require('./Laboratory')(LaboratoryModel);
const TransactionController = require('./Transaction')(TransactionModel);

module.exports = {
  UserController,
  LaboratoryController,
  TransactionController
};
