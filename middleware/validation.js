  let validate = (req, res, next) => {
    console.log(req.body.title);
    if (req.body.title !== "") {
        if (!(/^[{}<>;]/.test(req.body.title))) {
        res.status(400)
          .json({
            error: 'Title contained {}, <> or ;'
          });
        }
    } else if (req.body.author !== "") {
      if(/^[{}<>\;]+$/.test(req.body.author)) {
        res.status(400)
          .json({
            error: 'Author contained {}, <> or ;'
          });
        }
    } else if (req.body.description !== "") {
      if(/^[{}<>\;]+$/.test(req.body.description)) {
        res.status(400)
        .json({
          error: 'Description contained {}, <> or ;'
        });
      }
    } else if ((/[a-zA-Z #]/.test(req.body.hashtags))) {
        res.status(400)
        .json({
          error: 'hashtags contained {}, <> or ;'
        });
    } else {
      next();
    }
    console.log('hello');
    next();
  };


  module.exports = validate;