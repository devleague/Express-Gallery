  let validate = (req, res, next) => {
    if (/[{}<>;]/g.test(req.body.title) ||
      /[{}<>;]/g.test(req.body.author) ||
      /[{}<>;]/g.test(req.body.description) ||
      /[<>?":{}|!@$%^&*()_\-+,./\];\\=]/g.test(req.body.hashtags)
      ){
        res.status(400)
          .json({
            error: 'Invalid Input'
          });
    } else {
      next();
    }
  };


  module.exports = validate;