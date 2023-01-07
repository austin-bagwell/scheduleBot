"use strict";

const consigneeRoutes = require("./backend/routes/consigneeRoutes");

const express = require("express");
const app = express();

const port = process.env.port || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", proNumbers);
app.use("/", consigneeRoutes);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
