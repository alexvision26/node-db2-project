const express = require("express");
const db = require("../data/connection");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => res.status(500).json({ message: "Error retrieving car" }));
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData, "id")
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(newCar => {
          res.status(201).json({ newCar });
        });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("cars")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(err => res.status(500).json({ message: "Error retrieving record" }));
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Record deleted successfully" });
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(err => res.status(500).json({ message: "Error retrieving record" }));
});

module.exports = router;
