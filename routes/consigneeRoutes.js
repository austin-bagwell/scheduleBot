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
  shipFrom: ["DUR", "SF", "DUR", "DUR", "SF"],
};

/**
 * Router to define all consignee routes
 * @param {Router} router
 *
 */
// export const consigneeRoutes = (router) => {
// defining the route
// localhost:3000/get-consignees
router.get("/get-consignees", (req, res) => {
  res.json(dummyJSON);
  // also go to MySQL and execute a query
  // let data = getDataFromSQL()
  // res.json(data)
});
module.exports = router;
// };
