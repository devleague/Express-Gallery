  let validate = (req, res, next) => {
    if (/[{}<>;]/g.test(req.body.title) || req.body.title === undefined ||
      /[{}<>;]/g.test(req.body.author) || req.body.author === undefined ||
      /[{}<>;]/g.test(req.body.description) || req.body.description === undefined ||
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