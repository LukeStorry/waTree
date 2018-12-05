'use strict';

var Nedb = require('nedb');

let db = new Nedb({
  filename: './users.db',
  autoload: true,
});

function insertUser(name) {
  let doc = {
    name: name,
    drinks: [],
  };
  db.insert(doc, function (err, newDoc) {
    if (err) {
      return console.log(err);
    }

    console.log('Inserted a new user to db', name);
    return newDoc._id;
  });
}

function drinkWater(name, callback) {
  var thisTimestamp = new Date().toLocaleString();
  db.update({ name: name }, { $push: { drinks: thisTimestamp } }, { upsert: true },
    function () {
      console.log('added timestamp', thisTimestamp, 'to', name);
      callback();
    }
  );
}

function returnAll(callback) {
  db.find({}, function (err, docs) {
    callback(docs);
  });
}

module.exports = {
  insertUser,
  drinkWater,
  returnAll,
};
