module.exports = (sequelize, DataTypes) => {
  const Professionals = sequelize.define("Professionals", {
    professionals_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    identificationDocument: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    certificates: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobCategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "professionals",
    timestamps: false
  });

  Professionals.associate = function(models) {
    Professionals.belongsTo(models.User, {
      foreignKey: "user_id"
    });
    Professionals.hasMany(models.HiringApplications, {
      as: "hiringApplications",
      foreignKey: "professionals_id"
    });
    Professionals.hasMany(models.RatingsAndComments, {
      as: "ratingsAndComments",
      foreignKey: "professionals_id"
    });
    Professionals.hasOne(models.JobCategory, {
      foreignKey: "jobCategory_id"
    });
  };

  return Professionals;
};
