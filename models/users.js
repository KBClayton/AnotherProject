module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    firstName: {
      type: DataTypes.STRING,
      required: true
    },
    lastName: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true
    },
    location: {
      type: DataTypes.STRING,
      required: true
    }
  });
  return User;
};
