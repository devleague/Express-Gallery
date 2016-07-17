var path = require('path');

module.exports = {
  create: addGallery
};

var JSON_DATA_PATH = path.resolve('data', 'gallery.json');

function addGallery (data, callback) {
  var fs = require('fs');
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json) {
    if (err) {
      throw err;
    }
    else {
      var galleries = JSON.parse(json);
      galleries.push(data);
      console.log(galleries);
      fs.writeFile(JSON_DATA_PATH, JSON.stringify(galleries), function (err) {
        callback(err, data);
      });
    }
  });
}