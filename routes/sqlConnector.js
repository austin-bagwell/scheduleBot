"use strict";

"use strict";
const express = require("express");
const makeConnection = require("../mysqlConnector");
const router = express.Router();
const sqlConnector = require("../mysqlConnector");
// FIXME how can I get the results of the SQL query as a response from this route?
/**
 * @param {Router} router
 */
router.get("/sql", (req, res) => {
  const queryResults = sqlConnector.makeConnection();
  res.send(queryResults);
});

module.exports = router;
