"use strict";
const Consignee = require("../models/consignee.model.js");

// Create and save a new Consignee
exports.create = (req, res) => {
  // validation
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty",
    });
  }

  // create a Consignee
  const consignee = new Consignee({
    name: req.body.name,
    avgTiT: req.body.avgTiT,
  });

  //   save Consignee in database
  Consignee.create(consignee, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occured making the Consignee",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Consignees from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.name;

  Consignee.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

// Find a single Consignee by name
exports.findOne = (req, res) => {
  Consignee.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Found no Consignee with name ${req.params.name}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Consignee with name " + req.params.name,
        });
      }
    } else res.send(data);
  });
};

// Update a Consignee identified by the name in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request can not be empty!",
    });
  }

  console.log(req.body);

  Consignee.updateByName(
    req.params.name,
    new Consignee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Found no Consignee with name ${req.params.name}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Consignee with name " + req.params.name,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Consignee with the specified id in the request
exports.delete = (req, res) => {
  Consignee.remove(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consignee with name ${req.params.name}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Consignee with name " + req.params.name,
        });
      }
    } else res.send({ message: `Consignee was deleted successfully!` });
  });
};

// Delete all Consignees from the database.
exports.deleteAll = (req, res) => {
  Consignee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occurred while removing all Consignees.",
      });
    else res.send({ message: `All Consignees were deleted successfully!` });
  });
};
