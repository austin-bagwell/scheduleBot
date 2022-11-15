"use strict";

// import { consigneeRoutes } from "./routes/consigneeRoutes.js";
const consigneeRoutes = require("./routes/consigneeRoutes");
// import express from "express";
const express = require("express");
const app = express();

const port = 3000;

// router.use((req, res, next) => {
//   // middleware specific to this router
//   // if (req) {do auth or whatever}
//   console.log(`if router is used, you'll see me!`);
//   next();
// });

// runs fn to set up routes for consignee specifically
// consigneeRoutes(router);

app.use("/consignee", consigneeRoutes);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
