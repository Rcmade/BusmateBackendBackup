const EmailServices = require("../Services/emailServices");
const dataTransferEmail = require("../helpers/dataTransferEmail");
exports.errorHandler = async (err, req, res, next) => {
  if (err) {
    console.log("err", err);
    await EmailServices.sendEmailService(
      "rahulchourasiya4567@gmail.com",
      dataTransferEmail(`${err}`)
    );
  }
  res.status(500).json({ error: err.message || err });
};
