"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var db = require("./nedb.js");
var http = require("http");
var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

var httpServer = http.createServer(app);
var port = process.env.PORT || 5050;
httpServer.listen(port, function() {
  console.log("HTTP server listening on port", port);
});

app.get("/test/", function(req, res) {
  console.log("Alive Test");
  res.writeHead(200);
  res.end();
});

app.get("/", function(req, res) {
  console.log("returning All!");
  db.getScores(function(scoresList) {
    res.send(JSON.stringify(scoresList));
    res.end();
  });
});

app.get("/reset/:names/", function(req, res) {
  var names = req.params.names;
  console.log("all usernames are being replaced by", names);
  db.resetNames(names);
});

app.get("/add/:username/", function(req, res) {
  var username = req.params.username;
  console.log(username, "is being added.");
  db.addUser(username);
});

app.get("/has-drunk/:number/", function(req, res) {
  var number = parseInt(req.params.number);
  db.drinkWater(number, function() {
    console.log("user", number, "has drank water!");
  });

  res.writeHead(200);
  res.send();
});
