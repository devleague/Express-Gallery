module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // Post.belongsTo(models.User);
      }
    }
  });
  return Post;
};