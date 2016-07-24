module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  return Picture;
};