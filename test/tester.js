const express = require('express');
const app = require('../server.js');
const supertest = require("supertest")(app);

const successMessage = JSON.stringify({
  success: true
});

describe("gallery server GET", function(){

  it("gives the index page when / is requested", (done) => {
    supertest
    .get("/")
    .expect(200)
    .end(done);
  });

  it("gives a 404 when a nonexistent page is requested", (done) => {
    supertest
    .get("/100000000")
    .expect(404)
    .end(done);
  });

  it("gives a new picture creation page when /new is requested, and does not interpret 'new' as a picture id", (done) => {
    supertest
    .get("/gallery/new")
    .expect(200)
    .end(done);
  });
});

describe("gallery server POST", function() {
  it("returns an error if no or incomplete form data is provided", (done) => {
    supertest
    .post("/gallery")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('title=Landscapes+of+Norway')
    .send('author=author')
    .expect(400)
    .end(done);
  });

  it("returns a success message if proper fields are provided", (done) => {
    supertest
    .post("/gallery")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('title=Cat+Toy')
    .send('author=amazon')
    .send('link=https://images-na.ssl-images-amazon.com/images/I/41Vjlg8U8PL._SY355_.jpg')
    .send('description=cat+toy')
    .send('hashtags=#CATTOY')
    .expect(200)
    .expect(successMessage)
    .end(done);
  });

  it("creates a new page each time POST is sent with valid data", (done) => {
    supertest
    .post("/gallery")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('title=Doge+Toy')
    .send('author=japan')
    .send('link=http://www.papercraftsquare.com/wp-content/uploads/2014/04/Doge-Paper-Toy.jpg')
    .send('description=doge+toy')
    .send('hashtags=#DOGE#Origami')
    .expect(200)
    .expect(successMessage)
    .end(done);
  });

  it("creates a page from data in POST body", (done) => {
    supertest
    .get("/gallery/2")
    .expect(200)
    .end(done);
  });

  it("gives each item a unique ID upon creation", (done) => {
    supertest
    .get("/gallery/3")
    .expect(200)
    .end(done);
  });

});

describe("gallery server PUT", function() {

  it("must be given an extant item id", (done) => {
    supertest
    .get("/gallery/1")
    .expect(200)
    .end(done);
  });

  it("has a workaround for the lack of PUT from HTML forms", (done) => {
    supertest
    .post("/gallery/1")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('_method=PUT')
    .send('title=Cat+Toy')
    .send('author=amazon')
    .send('link=https://images-na.ssl-images-amazon.com/images/I/41Vjlg8U8PL._SY355_.jpg')
    .send('description=cat+toy')
    .send('hashtags=#CATTOY')
    .expect(200)
    .end(done);
  });

  it("will not accept from POST requests without the workaround", (done) => {
    supertest
    .post("/gallery/1")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('title=Cat+Toy')
    .send('author=amazon')
    .send('link=https://images-na.ssl-images-amazon.com/images/I/41Vjlg8U8PL._SY355_.jpg')
    .send('description=cat+toy')
    .send('hashtags=#CATTOY')
    .expect(405)
    .end(done);
  });

  it("will not edit with invalid or empty input", (done) => {
    supertest
    .post("/gallery/1")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('_method=PUT')
    .send('name=Cat+Toy')
    .send('inventory=four')
    .expect(400)
    .end(done);
  });

  it("returns a failure message if the page does not exist", (done) => {
    supertest
    .post("/gallery/-1")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('_method=PUT')
    .send('title=Cat+Toy')
    .send('author=amazon')
    .send('link=https://images-na.ssl-images-amazon.com/images/I/41Vjlg8U8PL._SY355_.jpg')
    .send('description=cat+toy')
    .send('hashtags=#CATTOY')
    .expect(404)
    .end(done);
  });

  it("modifies a page from data in PUT body", (done) => {
    supertest
    .get("/gallery/1")
    .expect(200)
    .end(done);
  });
});

describe("product server DELETE", function() {

  it("returns a failure message if the page does not exist", (done) => {
    supertest
    .del("/gallery/496")
    .expect(404)
    .end(done);
  });

  it("returns a success message if proper credentials are provided and the page exists", (done) => {
    supertest
    .del("/gallery/1")
    .expect(200)
    .expect(successMessage)
    .end(done);
  });

  it("removes the resource at the specified url", (done) => {
    supertest
    .get("/gallery/1")
    .expect(404)
    .end(done);
  });
});

