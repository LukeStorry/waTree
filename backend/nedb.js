'use strict';

var Nedb = require('nedb');

let db = new Nedb({
  filename: './users.db',
  autoload: true,
});

function resetNames(usernames) {
  db.remove({}, { multi: true }, function(err, numRemoved) {});
  var namesArray = usernames.split(',');
  var newDB = [];
  for (var i = 0; i < namesArray.length; i++) {
    newDB.push({
      number: i,
      name: namesArray[i],
      drinks: [],
    });
  }
  db.insert(newDB, function(err, newDocs){
    console.log("Reset DB with new docs:");
    console.log(newDocs);
  })
}

function createNewDoc(username, callback) {
  db.find({}, function(err, users) {
    var userNum;
    var numberArray = users.map(function(u) { return u.number; });
    for (userNum = 0; userNum < users.length + 1; userNum++) {
      console.log(userNum);
      if (!numberArray.includes(userNum)) {
        break;
      }
    }
    var doc = {
      number: userNum,
      name: username,
      drinks: [],
    };
    callback(doc);
  });
}

function addUser(username) {
  createNewDoc(username, function(doc) {
    db.insert(doc, function(err, newDoc) {
      console.log('Inserted a new user to db:', newDoc);
    });
  })
}

function drinkWater(number, callback) {
  var thisTimestamp = Math.floor(Date.now() / 1000)

  db.update({ number: number }, { $push: { drinks: thisTimestamp } },
    function() {
      console.log('added timestamp', thisTimestamp, 'to user', number);
      callback();
    }
  );
}

function getScores(callback) {
  db.find({}, function(err, users) {
    var scoresList = [];
    console.log(users);
    users.forEach(function(user) {
      var score = 30;
      var now = 1 + Math.floor(Date.now() / 1000); // needs +1 to avoid zero division
      user.drinks.forEach(function(drink) {
        score += 100 / Math.sqrt(now - drink);
      });
      console.log(user.name, 'score:', score);
      scoresList.push({
        'User': user.number,
        'UserName': user.name,
        'Score': Math.floor(Math.min(score, 100)),
        'isRaining': (now - 3 < user.drinks[user.drinks.length - 1]),
      });
    });
    console.log(scoresList);
    callback(scoresList);
  });
}

module.exports = {
  addUser,
  resetNames,
  drinkWater,
  getScores,
};
