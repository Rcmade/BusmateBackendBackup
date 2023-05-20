const express = require("express");

const router = express.Router();
const Admin = require("../controllers/admin");
const { backupMiddleware } = require("../middlewares/backupMiddleware");
router.post("/user-backup", backupMiddleware, Admin.backupUser);
router.get("/latestUser-backup", backupMiddleware, Admin.latestUser);

const FiveDaysLocation = require("../models/fiveDaysLocation");
 

module.exports = router;
