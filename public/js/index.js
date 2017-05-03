'use strict';

var userAccess = document.getElementById('userAccess');

userAccess.addEventListener('click', function(event){
  switch(event.target.id){
    case('logIn'):
      window.location='/login';
      break;
    case('logOut'):
      window.location='/logout';
      break;
    case('new_photo'):
      window.location='/gallery/new';
      break;
    case('signUp'):
      window.location='/signUp';
      break;
  }
});