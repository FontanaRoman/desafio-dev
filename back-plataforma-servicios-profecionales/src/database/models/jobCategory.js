module.exports = (sequelize, DataTypes) => {
  const JobCategory = sequelize.define("JobCategory", {
    jobCategory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(55),
      allowNull: false
    }
  }, {
    tableName: "jobCategory",
    timestamps: false
  });

  JobCategory.associate = function(models) {
    JobCategory.belongsTo(models.Professionals, {
      foreignKey: "jobCategory_id"
    });
  };

  return JobCategory;
};
