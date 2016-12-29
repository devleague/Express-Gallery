'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
    {
      username : 'Frank',
      password : 'Password',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'Kokolo',
      password : 'kokohead',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      username: 'Frank'
    }]);
  }
};
