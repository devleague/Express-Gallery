module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
      User.hasMany(models.Photo);
      }
     }
    });
  return User;
};