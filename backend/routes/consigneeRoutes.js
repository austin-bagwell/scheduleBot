"use strict";
const express = require("express");
const router = express.Router();

// TODO
const dummyJSON = {
  consignees: [
    "Kroger",
    "KeHE - Chino",
    "Wegmans",
    "UNFI - Dayville",
    "UNFI - Moreno Valley",
  ],
  avgTransitTimes: [3, 2, 3, 1, 7],
};

/**
 * Router to define all consignee routes
 * @param {router} router
 *
 */

router.get("/get-consignees", (req, res) => {
  res.json(dummyJSON);
  // let data = getDataFromSQL()
});
module.exports = router;
