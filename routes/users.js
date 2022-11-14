"use strict";

const express = require("express");
const app = express();

module.exports = router;

// TODO API
// https://javascript.plainenglish.io/how-to-set-up-a-simple-api-with-node-js-and-express-1d7c13afc7cc
// this article kinda sucks but here we are

// Obvisously not gonna work like I want, but basic routing ideas here
router.get("/users", (req, res) => {
  res.send("users");
});

router.post("/user/create", (req, res) => {
  const { name } = req.body;
  if (name) {
    users.push({ name });
    res.json({ ok: true, users });
  }
});

module.exports = router;
