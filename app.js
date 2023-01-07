"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3306",
};

app.use(cors(corsOptions));

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
require("./backend/routes/consignee.route.js")(app);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
