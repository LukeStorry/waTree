"use strict";

const sqlite3 = require("sqlite3").verbose();

class sqlDB {
  constructor(dbLocation) {
    this.dbLocation = dbLocation;
    this.setupDataBase();
  }

  openDB() {
    const db = new sqlite3.Database(this.dbLocation, err => {
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
    var db = this.openDB();
    db.serialize(function() {
      db.run(
        "CREATE TABLE IF NOT EXISTS UserGroups(GroupID INTEGER PRIMARY KEY AUTOINCREMENT, UserName TEXT NOT NULL, Score INTEGER)"
      );
      // db.run('') # Do we need a table for items yet?
    });
    this.closeDB(db);
  }

  addScore(username, scoreIncrease, callback) {
    var db = this.openDB();
    db.all(
      "SELECT Score score FROM UserGroups WHERE UserName = ?",
      [username],
      function(err, retRow) {
        if (err) {
          console.log(err.message);
        } else if (retRow && retRow.length > 0) {
          console.log(retRow);
          // TODO: Write back the value into the DB after incrementing it using scoreIncrease
        }
      }
    );
    this.closeDB();
  }

  addUser(username, callback) {
    var db = this.openDB();
    db.run("INSERT INTO UserGroups(UserName) VALUES(?)", [username], function(
      err
    ) {
      if (err) {
        return console.log(err.message);
      }
      console.log("A log has been inserted with rowid ${this.lastID}");
      if (callback) {
        callback();
      }
    });
    this.closeDB(db);
  }

  getUser(username, callback) {
    var db = this.openDB();
    var sqlQuery;
    sqlQuery = "SELECT * from UserGroups where UserName = " + username;
    db.query(sqlQuery, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      callback(results);
    });
    this.closeDB(db);
  }

  getScore(username, callback) {
    var db = this.openDB();
    var sqlQuery;
    sqlQuery = "SELECT Score from UserGroups where UserName = " + username;
    db.query(sqlQuery, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      callback(results);
    });
    this.closeDB(db);
  }

  getAllUsers(callback) {
    var db = this.openDB();
    var sqlQuery = "SELECT * FROM UserGroups";
    db.query(sqlQuery, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      callback(results);
    });
  }
}

module.exports = sqlDB;
