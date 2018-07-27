module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: {
      type: DataTypes.TEXT,
      required: true
    },
    password: {
      type: DataTypes.TEXT,
      required: true
    },
    salt: {
      type: DataTypes.TEXT,
      required: true
    },
    firstName: {
      type: DataTypes.TEXT,
      required: true
    },
    lastName: {
      type: DataTypes.TEXT,
      required: true
    },
    email: {
      type: DataTypes.TEXT,
      required: true
    },
    location: {
      type: DataTypes.TEXT,
      required: true
    }
  });
  return User;
};
