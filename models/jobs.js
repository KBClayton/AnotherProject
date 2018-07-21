module.exports = function(sequelize, DataTypes) {
  var SavedJob = sequelize.define("savedJob", {
    company: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    applicationLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    confidenceLevel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desiredSalary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    postedSalary: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })
  return SavedJob;
};