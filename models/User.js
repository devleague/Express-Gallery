/*jshint esversion: 6*/
//to access constraints for types--------|
//sequelize interface                    v
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task);
      }
    }
  });

  return User;
};