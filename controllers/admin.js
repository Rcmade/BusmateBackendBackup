const User = require("../models/user");
const EmailServices = require("../Services/emailServices");
const UserModel = require("../models/user");
const dataTransferEmail = require("../helpers/dataTransferEmail");
class Admin {
  async backupUser(req, res) {
    if (req.user.role === "superAdmin" && req.user.isAuthenticated === true) {
      try {
        if (req.body?.length) {
          const insertedUser = await User.insertMany(req.body, {
            ordered: false,
          });
          await EmailServices.sendEmailService(
            "rahulchourasiya4567@gmail.com",
            dataTransferEmail(
              `Total users sent by primary server: ${req.body.length}.
              Total users saved by secondary server in database: ${insertedUser.length}
              `
            )
          );

          return res.send("<h1> User Access Denied</h1>");
        } else {
          await EmailServices.sendEmailService(
            "rahulchourasiya4567@gmail.com",
            dataTransferEmail(
              `There are no user inserted in db because no user send by database: ${req.body.length}`
            )
          );
          return res.send("<h1>Access Denied</h1>");
        }
      } catch (error) {
        await EmailServices.sendEmailService(
          "rahulchourasiya4567@gmail.com",
          dataTransferEmail(`"Error from user inserting documents:", ${error}`)
        );
        console.log(error);
        return res.json({ error });
      }
    } else {
      await EmailServices.sendEmailService(
        "rahulchourasiya4567@gmail.com",
        dataTransferEmail(`"Un Autharize Access" in User backup route`)
      );
      return res.json({ error: "Un Autharize Access" });
    }
  }

  async latestUser(req, res) {
    if (req.user.role === "superAdmin" && req.user.isAuthenticated === true) {
      const latestUser = await UserModel.find()
        .sort({ createdAt: -1 })
        .limit(1);

      // console.log({ latestUser });
      return res.json({ createdAt: latestUser[0]?.createdAt });
    } else {
      await EmailServices.sendEmailService(
        "rahulchourasiya4567@gmail.com",
        dataTransferEmail(`"Un Autharize Access" in User backup route`)
      );
      return res.status(400).json({ error: "Un Autharize Access" });
    }
  }
}

module.exports = new Admin();
