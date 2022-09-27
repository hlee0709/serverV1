/*********************************************************************************
 *  WEB322 – Assignment 02
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: ______Hyunjung Lee____ Student ID: _150 833 200_ Date: ______2022-09-27_______
 *
 *  Online (Cyclic) Link: ________________________________________________________
 *
 ********************************************************************************/

//The server must make use of the express module
var express = require("express");

var app = express();
//to html fetch
const path = require("path");
//Updating the custom blog-service.js module
const data = require("./blog-service.js");

//the server must listen on process.env.PORT || 8080
var HTTP_PORT = process.env.PORT || 8080;

//for your server to correctly return the "/css/main.css" file,
//the "static" middleware must be used:  in your server.js file,
app.use(express.static("public"));

//The server must output: "Express http server listening on port" - to the console,
//where port is the port the server is currently listening on(ie: 8080)
function onHttpStart() {
  console.log("Express http server listening on " + HTTP_PORT);
}

//The route "/" must redirect the user to the "/about" route –
//this can be accomplished using res.redirect()(see week 4 "Response object")
app.get("/", function (req, res) {
  res.redirect("/about");
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

// Updating the new routes to use blog-service.js
app.get("/blog", function (req, res) {
  //res.send("TODO: get all posts who have published==true");
  data
    .getPublishedPosts()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get("/posts", function (req, res) {
  data
    .getAllPosts()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get("/categories", function (req, res) {
  data
    .getCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

data
  .initialize()
  .then(function () {
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch(function (err) {
    console.log("Unable to start server: " + err);
  });
