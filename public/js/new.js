var submitNewPhoto = document.getElementById('submitNewPhoto');

submitNewPhoto.addEventListener('click', function() {

  var author = document.getElementById('author').value;
  var link = document.getElementById('link').value;
  var description = document.getElementById('description').value;

  var request = new XMLHttpRequest();
  request.addEventListener('load', function(data) {
    window.location='/gallery';
  });

  request.open('POST', '/gallery');
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify({ author : author,
                link : link,
                description : description
              }));


});

