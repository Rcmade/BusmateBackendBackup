const userAuthenticateUserEmail = (name) => {
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
                        Congratulations! Your Busmate account has been
                        successfully verified and is now active. You can now
                        enjoy all the features and benefits of our app.
                      </p>

                      <p>
                        We would like to take this opportunity to thank you for
                        choosing Busmate and for completing the verification
                        process. Your security and privacy are of utmost
                        importance to us, and we take great care to ensure that
                        our app is safe and secure for all users.
                      </p>
                      <p>
                        If you have any questions or concerns, please don't
                        hesitate to contact us at
                        <a href="mailto: contact.busmate@gmail.com">Contact</a>.
                      </p>

                      <p>
                        Thank you for using Busmate. We look forward to serving
                        you and providing you with the best possible experience.
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

module.exports = userAuthenticateUserEmail;
