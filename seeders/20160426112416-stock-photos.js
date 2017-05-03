'use strict';

var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {

    let pictures = [];
    for(let i = 0; i < 5; i++) {
      pictures.push({
        author : faker.name.findName(),
        link : "https://unsplash.it/" + 500 + "/" + (350 + Math.floor( Math.random() * 100)),
        description: faker.lorem.paragraph(),
        createdAt : new Date(),
        updatedAt : new Date(),
        UserId : 1
      });
    }

      return queryInterface.bulkInsert('Photos', pictures, {});
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Photos', null, {});

  }
};
