var editFieldsButton = document.getElementById('editFieldsBtn');

editFieldsButton.addEventListener('click', function(event) {
  var newObj = {
    author: document.getElementById('author').value,
    link: document.getElementById('link').value,
    description:document.getElementById('description').value
  };

  var editReq = new XMLHttpRequest();
  editReq.open('PUT', '/gallery/'+ event.target.dataset.id);
  editReq.setRequestHeader('Content-Type', 'application/json');
  editReq.send(JSON.stringify(newObj));

  editReq.addEventListener('load', function(data) {
    window.location='/gallery';
  });
});