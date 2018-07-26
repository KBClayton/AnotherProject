module.exports = function(sequelize, DataTypes) {
  var SavedJob = sequelize.define("savedJob", {
    company: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    applicationLink: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    position: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jobLocation: {
      type: DataTypes.TEXT,
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
    jobSearchID: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    postedSalary: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })
  return SavedJob;
};