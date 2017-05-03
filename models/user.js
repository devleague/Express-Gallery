'use strict';

const bcrypt = require('bcryptjs'),
      Photo  = require('./Photo.js')
;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username  : DataTypes.STRING,
    password  : DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : function(user, options) {
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: function(models){
        User.hasMany(models.Photo);
      }
    }
  });


  return User;
};