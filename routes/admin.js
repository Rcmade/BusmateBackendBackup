const express = require("express");

const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
const Admin = require("../controllers/admin");
const upload = require("../middlewares/storage");
const { backupMiddleware } = require("../middlewares/backupMiddleware");

router.post("/user-varify", isAuth, Admin.authenticateUser);
router.post("/user-not-varify", isAuth, Admin.authenticateNotUser);
router.post("/user-create", isAuth, upload.array("imgs"), Admin.createUser);
router.get("/user-all-user-view", isAuth, Admin.allUserView);
router.get("/user-search", isAuth, Admin.userSearch);
router.get("/user-profile", isAuth, Admin.userProfile);
router.post("/nginx-error", isAuth, Admin.nginxError);
router.get("/current-contributors", isAuth, Admin.currentContributor);

router.post("/user-backup", backupMiddleware, Admin.backupUser);
router.get("/user-sync", backupMiddleware, Admin.syncUserData);

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
