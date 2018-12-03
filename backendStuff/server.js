"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var dhini = require("./nedb.js");
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

app.get("/", function(req, res) {
  console.log("returning All!");
  dhini.returnAll(function(rows) {
    res.send(JSON.stringify(rows));
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
  console.log("returning for a particular user!");
  var username = req.params.username;
  dhini.insertUser(username);
  dhini.drinkWater(username, function() {
    res.writeHead(200);
    res.end();
  });
});

app.get("/has-drunk/:username/", function(req, res) {
  var username = req.params.username;
  dhini.drinkWater(username, function() {
    console.log("Potato");
  });
  res.writeHead(200);
  res.send();
});
