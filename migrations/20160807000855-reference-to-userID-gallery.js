'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .addColumn('Galleries', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Users",
          key: "id"
        }
      });

    /*return queryInterface.createTable('temp_galleries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      }
    })
    .then(function () {
      queryInterface.addColumn('Galleries', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: "Users",
          key: "id"
        }
      });
    })
    .then(function () {
      return queryInterface.sequelize
        .query('SELECT id, author FROM "Galleries";')
        .then(function (results) {
          return results[0];
        })
        .then(function (galleries) {
          return queryInterface
          .bulkInsert('temp_galleries', galleries)
          .then(function () {
            return galleries;
        });
      });
    })
    .then(function (galleries) {
      return queryInterface.sequelize
        .query('SELECT * FROM "Users" UPDATE "Galleries" SET user_id = ');
    });*/
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
    .removeColumn('Galleries', 'user_id');
      /*.dropTable('temp_galleries');
      .then(function () {
        return queryInterface
        .removeColumn("Galleries", "user_id", {
      });
    });*/
  }
};
