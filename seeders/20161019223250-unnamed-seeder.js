'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'galleryuser',
        password: 'password',
        emailaddress: 'woof@doge.com',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        username: 'meow',
        password: 'iamcat',
        emailaddress: 'meow@cat.com',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        username: 'superdoge',
        password: 'icanfly',
        emailaddress: 'superdoge@doge.com',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },


  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users',
      {
        username: ['galleryuser', 'doge', 'meow', 'superdoge']
      }, {});
  }
};
