module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    author: DataTypes.STRING,
    link: DataTypes.TEXT,
    hashtags: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.User);
      }
    }
  });

  return Photo;
};