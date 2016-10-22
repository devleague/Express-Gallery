'use strict';

const bcrypt = require('bcrypt');
const admin_password = 'password'; //change this for production!


let up = function(queryInterface, Sequelize) {
  let salt = bcrypt.genSaltSync(10);
  return queryInterface.bulkInsert('Users', [
    {
      username: 'galleryuser',
      password: bcrypt.hashSync('password', salt),
      emailaddress: 'woof@doge.com',
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
};


let down = function (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Users',
    {
      username: ['galleryuser', 'doge', 'meow', 'superdoge']
    }, {});
};

module.exports = {
  up: up,
  down: down
};
