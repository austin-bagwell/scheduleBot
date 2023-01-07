module.exports = (app) => {
  const consignees = require("../controllers/consignee.controller.js");
  //   was var... did it need to be for this? we'll find out!
  const router = require("express").Router();

  // Create a new Consignee
  router.post("/", consignees.create);

  // Retrieve all Consignees
  router.get("/", consignees.findAll);

  // Retrieve a single Consignee with name
  router.get("/:name", consignees.findOne);

  // Update a Consignee with name
  router.put("/:name", consignees.update);

  // Delete a Consignee with name
  router.delete("/:name", consignees.delete);

  // Delete all Consignees
  router.delete("/", consignees.deleteAll);

  app.use("/api/consignees", router);
};
