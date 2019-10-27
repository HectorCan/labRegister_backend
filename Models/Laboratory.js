module.exports = (sequelize, type) => {
  return sequelize.define('laboratories', {
    id: {
      type:           type.INTEGER,
      primaryKey:     true,
      autoIncrement:  true,
      allowNull:      false,
    },
    name: {
      type:           type.STRING(),
      allowNull:      false,
    }
  }, {
    timestamps: true
  });
};
