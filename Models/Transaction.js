module.exports = (sequelize, type) => {
  return sequelize.define('transactions', {
    id: {
      type:           type.INTEGER,
      primaryKey:     true,
      autoIncrement:  true,
      allowNull:      false,
    },
    userId: {
      type:           type.INTEGER,
      references: {
        model:        'users',
        key:          'id',
      },
    },
    laboratoryId: {
      type:           type.INTEGER,
      references: {
        model:        'Laboratories',
        key:          'id',
      }
    },
    type: {
      type:           type.STRING(3), // * | #
      allowNull:      false,
    },
    arrived_at: {
      type:           type.DATE,
      defaultValue:   type.NOW,
      allowNull:      false,
    }
  }, {
    timestamps: true,
  });
};
