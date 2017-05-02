/*jshint esversion: 6*/

const express = require('express');
const router = express. Router();

module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define("Gallery", {
      title: DataTypes.TEXT,
      author: DataTypes.TEXT,
      link: DataTypes.TEXT,
      description: DataTypes.TEXT
  }, {
    // classMethods: {
    //   associate: function(models) {
    //     Gallery.belongsTo(models.User);
    //   }
    //}
  });

  return Gallery;
};


