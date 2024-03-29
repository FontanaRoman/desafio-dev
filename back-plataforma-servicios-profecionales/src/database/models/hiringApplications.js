module.exports = (sequelize, DataTypes) => {
  const HiringApplications = sequelize.define("HiringApplications", {
    request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    professionals_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "hiringApplications",
    timestamps: false
  });

  HiringApplications.associate = function(models) {
    HiringApplications.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id"
    });
    HiringApplications.belongsTo(models.Professionals, {
      as: "professionals",
      foreignKey: "professionals_id"
    });
    HiringApplications.belongsTo(models.State, {
      as: "state",
      foreignKey: "state_id"
    });
  };

  return HiringApplications;
};
