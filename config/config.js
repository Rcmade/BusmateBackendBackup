const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "du1fpl9ph",
  api_key: "895233789778145",
  api_secret: "F6xNF_YOFyEecT2JXaceRs_kemw",
  secure: true,
});

module.exports = cloudinary;
