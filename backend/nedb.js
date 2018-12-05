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
  var thisTimestamp = Math.floor(Date.now() / 1000)

  db.update({ name: name }, { $push: { drinks: thisTimestamp } }, { upsert: true },
    function () {
      console.log('added timestamp', thisTimestamp, 'to', name);
      callback();
    }
  );
}

function getScores(callback) {
  db.find({}, function (err, rows) {
    var scoresList = [];
    console.log(rows);
    rows.forEach(function(row){
      var score = 30;
      var now = 1 + Math.floor(Date.now() / 1000); // needs +1 to avoid zero division
      row.drinks.forEach(function(drink){
        score += 100 / Math.sqrt(now - drink);
      });
      console.log(row.name, 'score:', score);
      score = Math.min(score, 100)
      scoresList.push({
        'UserName': row.name,
        'Score': score,
        'isRaining': (now - 3 < row.drinks[row.drinks.length - 1]),
      });
    });
  console.log(scoresList);
  callback(scoresList);
});
}

module.exports = {
  insertUser,
  drinkWater,
  getScores,
};
