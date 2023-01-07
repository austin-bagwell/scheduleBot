"use strict";

const consigneeRoutes = require("./backend/routes/consigneeRoutes");
const proNumbers = require("./backend/routes/proNumbers");

const express = require("express");
const app = express();

const port = process.env.port || 3000;
// router.use((req, res, next) => {
//   // middleware specific to this router
//   // if (req) {do auth or whatever}
//   console.log(`if router is used, you'll see me!`);
//   next();
// });

// runs fn to set up routes for consignee specifically
// consigneeRoutes(router);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", proNumbers);
app.use("/", consigneeRoutes);
// app.use("/", sqlConnector);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
