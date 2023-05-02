const express = require("express");

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  userInitialRoute,
  logout,
  otpSendController,
  verifyOtp,
  updateProfile,
} = require("../controllers/auth");
const upload = require("../middlewares/storage");
const { isAuth } = require("../middlewares/isAuth");

router.post("/signup", upload.array("imgs"), signup);
router.post("/login", signin);
router.post("/otp-send", otpSendController);
router.get("/logout", logout);

router.post("/otp-varify", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.get("/user-initial", isAuth, userInitialRoute);
router.post("/user-update", isAuth, updateProfile);
router.post("/user-varify", isAuth, updateProfile);

module.exports = router;
