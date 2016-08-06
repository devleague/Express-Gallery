'use strict';
var faker = require('faker');
var randomize = {};
for (var i =0; i < 20; i++) {
  var randomAuthor = faker.internet.userName();
  var randonImage = faker.image.imageUrl();
  var randomDescription = faker.lorem.sentence();
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Galleries', [{
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Galleries', [{
      author: faker.internet.userName()
    }]);
  }
};
