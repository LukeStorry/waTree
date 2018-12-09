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
      bottleNum: i,
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
    var bottleNumArray = users.map(function(u) { return u.bottleNum; });
    for (userNum = 0; userNum < users.length + 1; userNum++) {
      console.log(userNum);
      if (!bottleNumArray.includes(userNum)) {
        break;
      }
    }
    var doc = {
      bottleNum: userNum,
      name: name,
      drinks: [],
    };
    callback(doc);
  });
}

function addUser(name) {
  createNewDoc(name, function(doc) {
    db.insert(doc, function(err, newDoc) {
      console.log('Inserted a new user to db:', newDoc);
    });
  })
}

function rename(bottleNum, name) {
  db.update({ bottleNum: bottleNum }, {$set: { name: name } },
     function(err, numAffected) {
       console.log('updated',numAffected,'docs: set name', name, 'on bottle', bottleNum);
    });
}


function drinkWater(bottleNum, callback) {
  var thisTimestamp = Math.floor(Date.now() / 1000)
  db.update({ bottleNum: bottleNum }, { $push: { drinks: thisTimestamp } },
    function() {
      console.log('added timestamp', thisTimestamp, 'to bottle', bottleNum);
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
      console.log(user.name, 'uncapped score:', score);
      scoresList.push({
        'Bottle': user.bottleNum,
        'UserName': user.name,
        'Score': Math.floor(Math.min(score, 100)),
        'isRaining': (now - 3 < user.drinks[user.drinks.length - 1]),
        'totalDrinks': user.drinks.length,
      });
    });
    console.log(scoresList);
    callback(scoresList);
  });
}

function getAll(callback) {
  db.find({}, function(err, docs) {
    callback(docs)
  })
}

module.exports = {
  addUser,
  rename,
  resetNames,
  drinkWater,
  getScores,
  getAll,
};
