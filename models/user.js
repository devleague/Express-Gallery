'use strict';
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      hashPassword: hashPassword,
    },
    setterMethods: {
      password: function (password) {
        this.setDataValue('password', hashPassword(password));
      }
    }
  });
  return User;
};

function hashPassword (password) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}