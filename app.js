"use strict";

const express = require("express");
// const cors = require("cors");
const app = express();

app.use(express.json());
// app.use(cors());
app.use("/", require("./routes/users"));

// app.get("/", (req, res) => {
//   res.send(`app.get('/') from app.js`);
// });

const port = 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
