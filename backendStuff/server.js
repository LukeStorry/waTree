"use strict";

var express = require("express");
var bodyParser = require("body-parser");
const sqlDB = require("./sqlDB.js");
const db = new sqlDB("./user_data.db");
var http = require("http");
var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });

var httpServer = http.createServer(app);

httpServer.listen(3030, function() {
  console.log("Example app listening on port 3030");
});

app.get("/", function(req, res) {
  console.log("potato");
  res.writeHead(200);
  res.end();
});

app.get("/get/:username/", function(req, res) {
  var username = req.params.username;
  db.getUser(username, function(returnedRow) {
    console.log(returnedRow);
    res.send(JSON.stringify(returnedRow));
    res.end();
  });
});

app.post("/post/:username/:score/", function(req, res) {
  var username = req.params.username;
  var score = req.params.score;
  console.log(username);
  console.log(score);
  db.addUser(username, function() {
    console.log("Added user!");
  });
  res.writeHead(200);
  res.send();
});

app.get("/all/", function(req, res) {
  db.getAllUsers(function(returnedRow) {
    console.log(returnedRow);
    res.send(JSON.stringify(returnedRow));
    res.end();
  });
});
