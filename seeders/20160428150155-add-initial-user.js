'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('Users', [{
        username: 'owen',
        password: '$2a$10$f0wTu86w1Fa8Xyzg3VDnSOMAemSpCgHTr6APZi4Oxzv4zIKikTgJi',
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
