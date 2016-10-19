let validateForm = () => {
  let title = document.forms["validate"]["title"];
  let author = document.forms["validate"]["author"];
  let link = document.forms["validate"]["link"];
  let description = document.forms["validate"]["description"];
  let hashtags = document.forms["validate"]["hashtags"];

  if (/[{}<>;]/g.test(title.value)){
    alert('Invalid Input in title');
    title.focus();
    return false;
  } else if(/[{}<>;]/g.test(author.value)) {
    alert('Invalid Input in author');
    author.focus();
    return false;
  } else if(/[{}<>;]/g.test(description.value)) {
    alert('Invalid Input in description');
    description.focus();
    return false;
  } else if(/[<>?":{}|!@$%^&*()_\-+,./\];\\=]/g.test(hashtags.value)){
    alert('Invalid Input in hashtags');
    hashtags.focus();
    return false;
  }

};