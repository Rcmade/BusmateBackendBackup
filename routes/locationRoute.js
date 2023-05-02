const express = require("express");
const User = require("../models/user");
const {
  newLocation,
  asignContributer,
  getNewLocation,
} = require("../controllers/location");
const realTimeLocation = require("../models/realTimeLocation");
const router = express.Router();

router.post("/addnewlocation", newLocation);
router.post("/asignContributer", asignContributer);

router.get("/getnewlocation", getNewLocation);

router.get("/get", async (req, res) => {
  // res.json(await realTimeLocation.find());
  res.json({});
});

router.post("/get", async (req, res) => {
  // const user = new User(req.body);
  // await user.save();
  res.json("user");
});

module.exports = router;
