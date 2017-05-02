/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    title: DataTypes.STRING,
    completed_at: DataTypes.DATE,

  }, {
    classMethods: {
      associate: function(models) {
        Picture.belongsTo(models.User);
      }
    }
  });

  return Picture;
};