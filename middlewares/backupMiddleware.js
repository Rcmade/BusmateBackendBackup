const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.backupMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // split the header string and get the token
    if (!token) return res.json({ error: "Invalid Token. Please Login" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log({ decode });
    // console.log("getUser", getUser);
    const { email } = decode;
    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "Invalid Token. Please Login" });
    req.user = user;
  } catch (error) {
    console.log(error);
  }
  next();
};
