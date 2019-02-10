const superagent = require('superagent');
const agent = superagent.agent();
const server = require('../server');
const account = {
  "username": "testuser",
  "password": "123456"
};

exports.login = function (request, done) {
  request(server)
    .post('/login')
    .send(account)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      agent.saveCookies(res);
      done(agent);
    });
};