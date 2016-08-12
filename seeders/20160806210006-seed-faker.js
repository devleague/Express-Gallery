'use strict';
var faker = require('faker');
var randomize = [];
for (var i =0; i < 10; i++) {
  var insert = {
  author: faker.internet.userName(),
  link : faker.image.imageUrl() + '/sports/' + Math.floor(Math.random() * 11),
  description: faker.lorem.sentence(),
  createdAt: new Date(),
  updatedAt: new Date(),
  user_id: faker.random.number()
  };
  randomize.push(insert);
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Galleries',randomize,

   {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Galleries', [{

    }]);
  }
};
