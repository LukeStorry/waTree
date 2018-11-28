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

app.get("/test/", function(req, res) {
  console.log("Alive Test");
  res.writeHead(200);
  res.end();
});

// Big GET BOI
app.get("/", function(req, res) {
  // set up empty JSON {}
  // for user in USERS table:
  //  - load all timestamps from Username TABLE
  //  - sort and use last two (and current time) to calculate score
  //  add user to JSON
  // res.send the filled in JSON
});

/*
    {
      name:potato;
      score: 73; // %%%%%%%%%%% ?? -- Height of the tree
      raining: false; //? : Drank in the last 2 seconds -- animation 
    }
  

*/

app.get("/get/:username/", function(req, res) {
  var username = req.params.username;
  db.getUser(username, function(returnedRow) {
    console.log(returnedRow);

    // get list of timestampes

    res.send(JSON.stringify(returnedRow));
    res.end();
  });
});

app.post("/has-drunk/:username/", function(req, res) {
  var username = req.params.username;
  console.log(username);
  db.addUser(username, function() {
    console.log("Added user!");
  });
  console.log("\n---- Ye boi ----\n");
  db.addScore(username, 1, function() {
    console.log("Added Score to user!");
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
