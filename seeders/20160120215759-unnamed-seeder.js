'use strict';
var faker = require ('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var gallery = [];

    for (var i = 0; i < 10; i++) {
      gallery.push({
        author: faker.internet.userName(),
        link: faker.image.imageUrl(),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    console.log(gallery.length);
    return queryInterface.bulkInsert('Galleries', gallery, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Galleries', null, {});
  }
};
