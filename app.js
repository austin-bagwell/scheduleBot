"use strict";

const express = require("express");

const app = express();

const consigneeRoutes = require("./backend/routes/consigneeRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", consigneeRoutes);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
