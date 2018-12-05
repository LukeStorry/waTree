"use strict";

var Nedb = require("nedb");

let db = new Nedb({ filename: "./users.db", autoload: true });

function insertUser(name) {
  let doc = { name: name, drinks: [] };
  db.insert(doc, function(err, newDoc) {
    console.log("Inserted a document to db");
    return newDoc._id;
  });
}

function drinkWater(name, callback) {
  var thisTimestamp = new Date().toLocaleString();
  db.update(
    { name: name },
    { $push: { drinks: thisTimestamp } },
    { upsert: true },
    function() {
      console.log("updated water for ", name);
      callback();
    }
  );
}

function returnAll(callback) {
  db.find({}, function(err, docs) {
    callback(docs);
  });
}
module.exports = { insertUser, drinkWater, returnAll };
