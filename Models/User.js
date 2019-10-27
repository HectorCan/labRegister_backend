module.exports = (sequelize, type) => {
  return sequelize.define('users', {
    id: {
      type:           type.INTEGER,
      primaryKey:     true,
      autoIncrement:  true,
      allowNull:      false,
    },
    matricule: {
      type:           type.STRING(9),
      allowNull:      false,
    },
    name: {
      type:           type.STRING(),
      allowNull:      false,
    },
  }, {
    timestamps: true
  });
};
