const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.login;
    // console.log({ token });
    if (!token) return res.json({ error: "Invalid Token. Please Login" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const getUser = await User.findOne({ token: token });
    if (getUser) {
      // console.log("getUser", getUser);
      const { _id } = decode;
      const user = await User.findById(_id);
      if (!user) return res.json({ error: "Invalid Token. Please Login" });
      req.user = user;
    } else {
      req.user = undefined;
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
