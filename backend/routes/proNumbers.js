"use strict";
const express = require("express");
const router = express.Router();

const dummyPROs = {
  kroger: ["7715", "8814", "1234"],
  wegmans: ["0001", "0002", "0003"],
};

/**
 * @param {Router} router
 */
router.get("/pro-numbers", (req, res) => {
  res.json(dummyPROs);
});

module.exports = router;
