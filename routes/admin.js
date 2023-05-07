const express = require("express");

const router = express.Router();
const Admin = require("../controllers/admin");
const { backupMiddleware } = require("../middlewares/backupMiddleware");
router.post("/user-backup", backupMiddleware, Admin.backupUser);
router.get("/latestUser-backup", backupMiddleware, Admin.latestUser);

const FiveDaysLocation = require("../models/fiveDaysLocation");
router.get("/get", async (req, res) => {
  FiveDaysLocation.aggregate([
    {
      $group: {
        _id: "$busNumber",
        locations: { $push: "$$ROOT" },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    return res.json(result);
  });
});

module.exports = router;
