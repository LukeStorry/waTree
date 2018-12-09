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
  console.log("returning all Scores!");
  db.getScores(function(scoresList) {
    res.send(JSON.stringify(scoresList));
    res.end();
  });
});

app.get("/data", function(req, res) {
  console.log("returning all Data!");
  db.getAll(function(scoresList) {
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

app.get("/rename/:bottleNum/:username/", function(req, res) {
  var bottleNum = parseInt(req.params.bottleNum);
  var username = req.params.username;
  console.log("name:", username, "is being added to bottle", bottleNum);
  db.rename(bottleNum, username);
});

app.get("/has-drunk/:bottleNum/", function(req, res) {
  var bottleNum = parseInt(req.params.bottleNum);
  db.drinkWater(bottleNum, function() {
    console.log("user", bottleNum, "has drank water!");
  });

  res.writeHead(200);
  res.send();
});
