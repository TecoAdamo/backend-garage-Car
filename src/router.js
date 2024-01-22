const express = require("express");
const router = express.Router();

const cars = require("./models/cars");

router.get("/cars", (req, res) => {
  res.status(200).json(cars);
});

module.exports = router;
