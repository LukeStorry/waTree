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

/*
    {
      name:potato;
      score: 73; // %%%%%%%%%%% ?? -- Height of the tree
      raining: false; //? : Drank in the last 2 seconds -- animation
    }

*/

app.get("/add/:username/", function(req, res) {
  var username = req.params.username;
  console.log(username, "is being added.");
  db.insertUser(username);
  db.drinkWater(username, function() {
    res.writeHead(200);
    res.end();
  });
});

app.get("/has-drunk/:username/", function(req, res) {
  var username = req.params.username;
  db.drinkWater(username, function() {
    console.log(username, " has drank water!");
  });

  res.writeHead(200);
  res.send();
});
