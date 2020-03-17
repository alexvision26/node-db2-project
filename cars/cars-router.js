const express = require("express");
const db = require("../data/connection");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "api working" });
});

module.exports = router;
