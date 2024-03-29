module.exports = (sequelize, DataTypes) => {
  const RatingsAndComments = sequelize.define("RatingsAndComments", {
    rating_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    professionals_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qualification: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    qualificationDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: "ratingsAndComments",
    timestamps: false
  });

  RatingsAndComments.associate = function(models) {
    RatingsAndComments.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id"
    });
    RatingsAndComments.belongsTo(models.Professionals, {
      as: "professionals",
      foreignKey: "professionals_id"
    });
  };

  return RatingsAndComments;
};
