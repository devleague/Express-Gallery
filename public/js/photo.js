'use strict';

var backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', function(event) {
  window.location=('/gallery');
});

var button = document.getElementById('photos');
button.addEventListener('click', function(event) {
  if(event.target.id === 'edit') {
    var editReq = new XMLHttpRequest();
    editReq.addEventListener('load', function(data) {
      console.log('data', data);

      try {
        var authorizedAction = (JSON.parse(data.currentTarget.responseText));
        if(!authorizedAction.success) {
          document.getElementById('error').innerHTML = "You cannot edit another user's photo";
        }
      }
      catch(err) {
        window.location='/gallery/' + event.target.dataset.id + '/edit';
      }

    });

    editReq.open('GET', '/gallery/' + event.target.dataset.id + '/edit');
    editReq.send();
  }

  else if(event.target.id === 'delete') {
    var deleteReq = new XMLHttpRequest();
    deleteReq.addEventListener('load', function(data) {
      var authorizedAction = (JSON.parse(data.currentTarget.responseText));

      if(authorizedAction.success){
        window.location='/gallery';
      }
      else{
        document.getElementById('error').innerHTML = "You cannot delete another user's photo";
      }
    });

    deleteReq.open('DELETE', '/gallery/' + event.target.dataset.id);
    deleteReq.send();
  }
});
