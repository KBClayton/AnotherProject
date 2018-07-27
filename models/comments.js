module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("comment", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
  return Comment;
};
