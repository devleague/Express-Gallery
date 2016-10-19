'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'doge',
        password: 'iamdoge',
        emailaddress: 'woof@doge.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        username: 'meow',
        password: 'iamcat',
        emailaddress: 'meow@cat.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        username: 'superdoge',
        password: 'icanfly',
        emailaddress: 'superdoge@doge.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },


  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Photos',
      {
        author: ['Such Doge', 'Doge', 'Snoop Dogey Doge']
      }, {});
  }
};
