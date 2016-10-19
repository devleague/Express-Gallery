let validateForm = () => {
  let title = document.forms["validate"]["title"];
  let author = document.forms["validate"]["author"];
  let link = document.forms["validate"]["link"];
  let description = document.forms["validate"]["description"];
  let hashtags = document.forms["validate"]["hashtags"];

  if (/[{}<>;]/g.test(title.value)){
    title.value = 'Invalid Input in Title';
    title.focus();
    return false;
  } else if(/[{}<>;]/g.test(author.value)) {
    author.value = 'Invalid Input in Author';
    author.focus();
    return false;
  } else if(/[{}<>;]/g.test(description.value)) {
    description.value = 'Invalid Input in Description';
    description.focus();
    return false;
  } else if(/[<>?":{}|!@$%^&*()_\-+,./\];\\=]/g.test(hashtags.value)){
    hashtags.value = 'Invalid Input in Hashtags';
    hashtags.focus();
    return false;
  }

};