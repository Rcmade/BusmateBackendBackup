const transporter = require("../config/emailConfig");

class EmailServices {
  async sendEmailService(toEmail, html) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: "Email Varification",
      html: html,
    };

    return transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email Send Error ", error);
        return false;
      } else {
        // console.log("Email Send Info ", info);
        return true;
      }
    });
  }
}

module.exports = new EmailServices();
