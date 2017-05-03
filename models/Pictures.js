/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,//might not work...ask for help
    description: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Picture.belongsTo(models.User);
      }
    }
  });

  return Picture;
};