const emailHtml = (email, name, otp, timeLimit = "10 Min") => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Call To Action</title>
  </head>

  <body style="background: #161f33">
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
    >
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="header">
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td class="align-center">
                  <img
                    src="https://res.cloudinary.com/du1fpl9ph/image/upload/v1680269961/BusmateLogo_frbuvl.png"
                    height="80"
                    alt="Busmate"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="content">
            <!-- START CENTERED WHITE CONTAINER -->

            <table
              style="
                color: black;
                background: #ffff;
                border-radius: 10px;
                padding: 10px;
              "
              role="presentation"
              class="main"
            >
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <tr>
                      <p>Dear ${name},</p>
                      <p>
                        Thank you for signing up with Busmate. To ensure the
                        security of your account, we require you to verify your
                        email address.
                      </p>
                      <p>
                        Your verification code is: <strong>${otp}</strong>.
                        Please enter this code in the verification field within
                        <strong>${timeLimit}</strong> minutes to complete the
                        verification process.
                      </p>
                      <p>
                        We are thrilled to have you as part of the Busmate
                        community. Our goal is to provide you with the best bus
                        booking experience possible, and we're committed to
                        constantly improving our services to meet your needs.
                      </p>
                      <p>
                        If you have any questions or concerns about your
                        account, please feel free to reach out to our customer
                        support team at
                        <a href="mailto: contact.busmate@gmail.com">Contact</a>.
                        We're always here to help!
                      </p>
                      <p>
                        Thank you for choosing Busmate, and we look forward to
                        serving you soon.
                      </p>
                      <p>Best regards,</p>
                      <p>Busmate Team</p>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- END MAIN CONTENT AREA -->
            </table>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

module.exports = emailHtml;
