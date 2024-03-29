module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define("State", {
    state_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(55),
      allowNull: false
    }
  }, {
    tableName: "state",
    timestamps: false
  });

  return State;
};
