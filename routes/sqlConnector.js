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
router.get("/sql", (req, res) => {
  const queryResults = queryDatabase().makeConnection();
  res.send(queryResults);
});

module.exports = router;
