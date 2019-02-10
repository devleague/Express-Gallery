const request = require('supertest');
const login = require('./superagent');
const chai = require('chai');
const expect = chai.expect;

describe('Express Gallery Server', () => {
  let server;

  describe('/home', () => {
    describe('GET', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should respond to "/" route', (done) => {
        request(server)
          .get('/')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(302, done);
      });

      it('should respond to "/login" route', (done) => {
        request(server)
          .get('/login')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should respond to "/register" route', (done) => {
        request(server)
          .get('/register')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should redirect "/logout" route to "/login" route', (done) => {
        request(server)
          .get('/logout')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(302, done);
      });
    });

    describe('POST', () => {
      describe('Login', () => {
        beforeEach(() => {
          delete require.cache[require.resolve('../server')];
          server = require('../server');

        });

        afterEach((done) => {
          request(server).get('/logout').set('Accept', 'text/html');
          server.close(done);
        });

        it('should redirect "/login" back to "/login" page if attempting to login with user that does not exist', (done) => {
          request(server)
            .post('/login')
            .send('username="faegadsgae"&password="aegadaega"')
            .expect((res) => {
              res.text === 'Found. Redirecting to /login';
            })
            .expect(302, done);
        });

        it('should redirect "/login" back to "/login" page if wrong password is supplied', (done) => {
          request(server)
            .post('/login')
            .send('username="badmckinney"&password="aegadaega"')
            .expect((res) => {
              res.text === 'Found. Redirecting to /login';
            })
            .expect(302, done);
        });

        it('should redirect to "/gallery" on successful login', (done) => {
          request(server)
            .post('/login')
            .send('username="badmckinney"&password="password"')
            .expect((res) => {
              res.text === 'Found. Redirecting to /gallery';
            })
            .expect(302, done);
        });
      });

      describe('Register', () => {
        describe('POST', () => {
          beforeEach((done) => {
            delete require.cache[require.resolve('../server')];
            server = require('../server');
          });

          afterEach((done) => {
            server.close(done);
          });

          it('should redirect back to "/register" when attempting to register a username thats taken', (done) => {
            request(server)
              .post('/register')
              .send('username="badmckinney"&password="faegadgae"')
              .expect((res) => {
                res.text === 'Found. Redirecting to /register';
              })
              .expect(302, done);
          });
        });
      });
    });
  });

  describe('/gallery', () => {
    describe('GET', () => {
      let agent;

      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
        login.login(request, (loginAgent) => {
          agent = loginAgent;
          done();
        });
      });

      afterEach((done) => {
        request(server).get('/logout');
        server.close(done);
      });

      it('should respond to "/gallery" by rendering listing.hbs', (done) => {
        const req = request(server)
          .get('/gallery')
          .set('Accept', 'text/html');
        agent.attachCookies(req);
        req.expect((res) => {
          res.text.length > 0;
        })
          .expect(200, done);
      });

      it('should respond to "/gallery/new" by rendering new.hbs', (done) => {
        request(server)
          .get('/gallery/new')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.text = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,500,700" rel="stylesheet">
              <link rel="stylesheet" href="/css/styles.css">
              <title>GREENTREK Gallery</title>
            </head>
            
            <body>
              <div id="logout">
              <form method="GET" action="/logout"><input class="logout__button" type="submit" value="Logout"></form>
            </div>
            <div id="header">
              <div class="logo-container">
                <a href="/">
                  <h1 class="logo">_GREENTREK</h1>
                </a>
              </div>
              <div class="headline-container">
                <p class="headline">Welcome to our online portfolio, we are a small group of passionate outdoors people and hikers,
                  looking to change and create amazing digital images to inspire others to follow in our innovative footsteps. Free
                  Greentrek WordPress Theme</p>
              </div>
            </div>
            <div class="new">
              <h1 class="header">Add New Photo</h1>
              <form method="POST" action="/gallery">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" autofocus>
                <label for="link">Link:</label>
                <input type="text" name="link" id="link">
                <label for="author">Author:</label>
                <input type="text" name="author" id="author">
                <label for="description">Description:</label>
                <input name="description" id="description">
                <input type="submit" value="Submit">
              </form>
            </div>
            </body>
            
            </html>`;
          })
          .expect(200, done);
      });

      it('should respond to "/gallery/:id" by rendering detail.hbs', (done) => {
        request(server)
          .get('/gallery/1')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.text = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,500,700" rel="stylesheet">
              <link rel="stylesheet" href="/css/styles.css">
              <title>GREENTREK Gallery</title>
            </head>
            
            <body>
              <div id="logout">
              <form method="GET" action="/logout"><input class="logout__button" type="submit" value="Logout"></form>
            </div>
            <div id="header">
              <div class="logo-container">
                <a href="/">
                  <h1 class="logo">_GREENTREK</h1>
                </a>
              </div>
              <div class="headline-container">
                <p class="headline">Welcome to our online portfolio, we are a small group of passionate outdoors people and hikers,
                  looking to change and create amazing digital images to inspire others to follow in our innovative footsteps. Free
                  Greentrek WordPress Theme</p>
              </div>
            </div>
            <h3 class="detail__flash"></h3>
            <div id="main">
              <div id="feature">
                <h2 class="feature__author">Stairway to Heaven – Chad Greiter</h2>
                <img class="feature__img" src="https://images.unsplash.com/photo-1492692171456-76c5c1dfae1a?ixlib&#x3D;rb-1.2.1&amp;ixid&#x3D;eyJhcHBfaWQiOjEyMDd9&amp;auto&#x3D;format&amp;fit&#x3D;crop&amp;w&#x3D;1350&amp;q&#x3D;80">
                <div class="form-container">
                  <p class="feature__description">The famous Stairway to heaven hike on Oahu, Hawaii</p>
                  <div class="button-container">
                    <form method="GET" action="/gallery/1/edit"><input class="edit_button" type="submit" value="Edit"></form>
                    <form method="POST" action="/gallery/1?_method=DELETE"><input class="delete_button" type="submit" value="Delete"></form>
                  </div>
                </div>
                <p class="feature__link"> Copyright Chad Greiter</p>
              </div>
            
              <div id="sidebar">
                <ul class="sidebar__list">
                  <li class="sidebar__item">
                    <a href="/gallery/4"><img class="sidebar__img" src="https://images.unsplash.com/photo-1523933553793-7b3b60a7ab8f?ixlib&#x3D;rb-1.2.1&amp;ixid&#x3D;eyJhcHBfaWQiOjEyMDd9&amp;auto&#x3D;format&amp;fit&#x3D;crop&amp;w&#x3D;700&amp;q&#x3D;80"></a>
                    <h3 class="sidebar__detail">Lanikai Pillboxes – Anthony Intraversato</h3>
                  </li>
                  <li class="sidebar__item">
                    <a href="/gallery/44"><img class="sidebar__img" src="https://images.unsplash.com/photo-1484523239100-bbd9b1827b23?ixlib&#x3D;rb-1.2.1&amp;ixid&#x3D;eyJhcHBfaWQiOjEyMDd9&amp;auto&#x3D;format&amp;fit&#x3D;crop&amp;w&#x3D;1490&amp;q&#x3D;80"></a>
                    <h3 class="sidebar__detail">Ryan Mountain – Brent Payton</h3>
                  </li>
                  <li class="sidebar__item">
                    <a href="/gallery/42"><img class="sidebar__img" src="https://images.unsplash.com/photo-1504193902866-27cfb5aafcc8?ixlib&#x3D;rb-1.2.1&amp;ixid&#x3D;eyJhcHBfaWQiOjEyMDd9&amp;auto&#x3D;format&amp;fit&#x3D;crop&amp;w&#x3D;1350&amp;q&#x3D;80"></a>
                    <h3 class="sidebar__detail">Angel&#x27;s Landing – Kristna Wagner</h3>
                  </li>
                </ul>
              </div>
            </div>
            </body>
            
            </html>`;
          })
          .expect(200, done);
      });

      it('should respond to "/gallery/:id/edit" by rendering edit.hbs', (done) => {
        request(server)
          .get('/gallery/1/edit')
          .set('Accept', 'text/html')
          .expect((res) => {
            console.log(res.text);
            // res.text = ``;
          })
          .expect(200, done);
      });

    });
  });
});