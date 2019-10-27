const Sequelize = require('sequelize');

const UserModel = require('./User.js');
const LaboratoryModel = require('./Laboratory.js');
const TransactionModel = require('./Transaction.js');

const mig_20191027 = require('../Migrations/20191027_c_and_u_tables');

const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.STORAGE || 'labregister_.db',
  logging: false
});

const User = UserModel(sequelize, Sequelize);
const Laboratory = LaboratoryModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);

sequelize.sync({ force: true })
  .then(() => {
    mig_20191027({User, Laboratory}); // Creamos los datos principales
  });

module.exports = {
  User,
  Laboratory,
  Transaction
};
