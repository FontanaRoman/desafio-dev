module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    roles_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "user",
    timestamps: false
  });

  User.associate = function(models) {
    User.hasMany(models.Professionals, {
      foreignKey: "user_id"
    });
    User.hasMany(models.HiringApplications, {
      as: "hiringApplications",
      foreignKey: "user_id"
    });
    User.hasMany(models.RatingsAndComments, {
      as: "ratingsAndComments",
      foreignKey: "user_id"
    });
    User.belongsTo(models.Roles,{
      foreignKey: "roles_id"
    })
  };

  return User;
};

