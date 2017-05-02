/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

const addPhoto = (item) => {
  console.log(item);
  //return something:
  console.log('add photo');
};

const editPhoto = (editInfo, editId) => {

};

const removePhoto = (removeInfo) => {

};

const getAllPhotos = () => {

};

const getPhotoById = (photoId) => {

  return photoId;
  // return Post.findAll({
  //   where: {
  //     id: photoId
  //   }
  // });
};

module.exports = {
  addPhoto,
  editPhoto,
  removePhoto,
  getAllPhotos,
  getPhotoById
};