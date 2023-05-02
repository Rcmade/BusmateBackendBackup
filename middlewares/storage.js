const multer = require("multer");


// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
