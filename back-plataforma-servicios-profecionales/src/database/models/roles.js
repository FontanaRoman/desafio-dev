module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define("Roles", {
    roles_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(55),
      allowNull: false
    }
  }, {
    tableName: "roles",
    timestamps: false
  });

  Roles.associate = function(models) {
    Roles.hasMany(models.User,{
      foreignKey: "roles_id",
    })
  }

  return Roles;
};
