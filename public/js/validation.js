  console.log('test');

  let validate = () => {
    console.log(document.forms[0].title);
    if (document.forms[0].title !== "") {
        if (/<>{}/.test(document.forms[0].title)) {
          alert("Please enter a valid title without <> and {}");
          document.forms[0].title.focus();
          return false;
        }
    } else if (document.forms[0].author !== "") {
      if(/<>{}/.test(document.forms[0].author)) {
        alert("Please enter a valid author without <> and {}");
        document.forms[0].author.focus();
        return false;
      }
    } else if (document.forms[0].description !== "") {
      if(/<>{}/.test(document.forms[0].description)) {
        alert("Please enter a valid description with out <> and {}");
        document.forms[0].author.focus();
        return false;
      }
    } else if (/<>{}/.test(document.forms[0].hashtags)) {
      alert ("Invalid tags");
      document.forms[0].hashtags.focus();
      return false;
    }
    return true;
  };