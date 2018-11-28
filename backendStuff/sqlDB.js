"use strict";

const sqlite3 = require("sqlite3").verbose();

/***
 * Plan:
 *  - Change the path to be a folder of DBs
 *  - Change the way to access / open DBs
 *  - --- openDB() takes NAME
 *  -  Username = name of the DB.
 *  - All of the DB functions take in username, and use the username to access the db.
 *  - ?? No more this.db??!?!?
 *  -- Is this even a constructor anymore?
 *
 */

class sqlDB {
  constructor(dbLocation) {
    this.dbLocation = dbLocation;
    this.setupDataBase();
  }

  openDB() {
    var db = new sqlite3.Database(this.dbLocation, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to SQlite database");
    });
    return db;
  }

  closeDB(db) {
    db.close(err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("closed the db");
    });
  }
  setupDataBase() {
    const db = this.openDB();
    db.serialize(function() {
      db.run(
        "CREATE TABLE IF NOT EXISTS AllUserTable(UserName TEXT NOT NULL, Score INTEGER)"
      );
      // db.run('') # Do we need a table for items yet?
    });
    this.closeDB(db);
  }

  addScore(username, scoreIncrease, callback) {
    const db = this.openDB();
    let query = "SELECT Score score FROM UserGroups WHERE UserName = ?";
    this.generalQueryHelper(db, query, [username], function(returnedRow) {
      console.log(returnedRow);
    });
    this.closeDB(db);
  }

  /*
    if(user NOT EXIST ):
      Add user :
      - Username -> USERS
      - Create Username table -> (TIMESTAMPS)  
    AddTimestamp to Username (TIMESTAMPS TABLE)
    */

  addUser(username, callback) {
    const db = this.openDB();
    let query = "INSERT INTO UserGroups(UserName) VALUES(?)";
    this.generalQueryHelper(db, query, [username], callback);
    this.closeDB(db);
  }

  getUser(username, callback) {
    const db = this.openDB();
    console.log("trying to access a user!");
    let sqlQuery;
    sqlQuery = "SELECT * from UserGroups where UserName = " + username;
    this.generalQueryHelper(db, sqlQuery, [username], callback);
    this.closeDB(db);
  }

  getScore(username, callback) {
    const db = this.openDB();
    let sqlQuery;
    sqlQuery = "SELECT Score from UserGroups where UserName = " + username;
    this.generalQueryHelper(db, sqlQuery, [username], callback);
    this.closeDB(db);
  }

  getAllUsers(callback) {
    console.log("Accessed all users! ");
    const db = this.openDB();
    let sqlQuery = "SELECT * FROM UserGroups";
    this.generalQueryHelper(db, sqlQuery, [], callback);
    this.closeDB(db);
  }

  generalQueryHelper(db, sqlQuery, queryReq, callback) {
    db.all(sqlQuery, [queryReq], function(err, rows) {
      if (err) {
        console.log(err.message);
      } else {
        if (callback) {
          if (rows == []) {
            console.log("SQL DB returned an empty row\n");
          }
          callback(rows);
        }
      }
    });
  }
}

module.exports = sqlDB;
