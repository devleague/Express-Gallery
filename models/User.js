module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        validatePassword: (value) => {
          if(/[{}<>;]/g.test(value)) {
            throw new TypeError("invalid characters in password");
          }
        }
      }
    },
    emailaddress: {
      type:DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        isIn: [['ADMIN', 'USER']]
      }
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