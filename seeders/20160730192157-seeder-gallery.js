'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Galleries', [{
      author: 'Destination 360',
      URL: 'http://www.destination360.com/contents/pictures/seven-wonders/machu-picchu.jpg',
      description: "The ruins of Machu Picchu remain one of the most beautiful and enigmatic ancient sites in the world. One of the primary functions of Machu Picchu was as an astrological observatory because of the Inca's deep rooted religion based on astronomy.",
      createdAt: new Date(),
      updatedAt: new Date()
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Galleries', [{
      author: 'Destination 360'
      }]);
  }
};
