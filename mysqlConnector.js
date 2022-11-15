"use strict";

// MySql currently living here rent free in my head
const mysql = require("mysql2");

// MySQL
// TODO
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ltl_shipments",
});

// CONNECT TO DATABASE, LOG SIMPLE QUERY
// TODO this becomes an exportable func, return result
// gotta put in a promise AKA gotta be async
// must return as promise new Promise (resolve, reject, err) {}
con.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log(`Connected to mySQL database!`);

  const sqlQuery = `SELECT DISTINCT dc_name
  FROM ltl_test
  WHERE ship_location = 'SF' LIMIT 5;`;

  con.query(sqlQuery, function (err, res) {
    if (err) {
      console.log(`Error: ${err.message}`);
    }
    console.log(res);
  });

  con.end((err) => {
    if (err) console.log(`Error: ${err}`);
    console.log(`Closing connection to database.`);
  });
});
