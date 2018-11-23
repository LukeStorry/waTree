"use strict";

var express = require("express");
var bodyParser = require("body-parser");
const sqlDB = require("./sqlDB.js");
const db = new sqlDB("./user_data.db");
var http = require("http");
var app = express();
app.use(bodyParser.json());

var httpServer = http.createServer(app);

httpServer.listen(3030, function() {
  console.log("Example app listening on port 3030");
});

app.get("/", function(req, res) {
  console.log("potato");
  res.writeHead(200);
  res.end();
});

app.get("/users/:username/", function(req, res) {
  var username = request.params.username;
  db.getUser(username, function(returnedRow) {
    console.log(returnedRow);
    send.json(json.stringify(returnedRow));
  });
});

app.post("/users/:username/", function(req, res) {
  var username = request.params.username;
  db.addUser(username, function() {
    console.log("Added user!");
  });
});

app.get("/allusers", function(req, res) {
  db.getAllUsers(function(returnedRow) {
    send.json(json.stringify(returnedRow));
  });
});
