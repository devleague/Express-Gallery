var db = require('./models');

db.sequelize.sync()
  .then(run);

function run () {
  var post = db.Gallery.findOne({
    include: [
      { model: db.User}
    ]
  });

  post.then(function (post) {
   console.log(post.user)
  });;
}
///////////////////////////////////
db.User
  .create({
    username: 'hfl',
    password: 'hjds'
  })
  .then(function (user) {
    user.update({
      password: 'secret'
    })
  })

  console.log(db.User.hashPassword('hfhdkj');

  db.User.findOne()
  .then(function (user) {
    console.log(user.password === db.User.hashPassword('secret'))
  })
  ////////////////////////////////////////
  hashPassword: hashPassword,
    },
    setterMethods: {
      password: function (password) {
        this.setDataValue('password', hashPassword(password));
      }
    }
  });
  return User;
};

function hashPassword (password) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}