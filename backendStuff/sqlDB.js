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
    const db = this.openDB();
    db.serialize(function() {
      db.run(
        "CREATE TABLE IF NOT EXISTS UserGroups(GroupID INTEGER PRIMARY KEY AUTOINCREMENT, UserName TEXT NOT NULL, Score INTEGER)"
      );
      // db.run('') # Do we need a table for items yet?
    });
    this.closeDB(db);
  }

  addScore(username, scoreIncrease, callback) {
    const db = this.openDB();
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
    const db = this.openDB();
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
    const db = this.openDB();
    let sqlQuery;
    sqlQuery = "SELECT * from UserGroups where UserName = " + username;
    this.generalQueryHelper(sqlQuery, [username], callback);
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
