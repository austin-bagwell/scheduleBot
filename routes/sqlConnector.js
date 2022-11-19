"use strict";

"use strict";
const express = require("express");
// const makeConnection = require("../mysqlConnector");
const router = express.Router();
const queryDatabase = require("../queryDatabase");
// FIXME how can I get the results of the SQL query as a response from this route?
/**
 * @param {Router} router
 */

const sqlQuery = `SELECT DISTINCT dc_name
 FROM ltl_test
 WHERE ship_location = 'SF' LIMIT 5;`;

router.get("/sql", (req, res) => {
  const queryResults = queryDatabase(sqlQuery);
  console.log(queryResults);
  res.send(queryResults);
});

module.exports = router;
