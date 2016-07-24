module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define("Gallery", {
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  return Gallery;
};