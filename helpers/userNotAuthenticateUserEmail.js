const userNotAuthenticateUserEmail = (
  name,
  email,
  idCard,
  busNumber,
  profileImage
) => {
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
                        Thank you for registering with Busmate. Unfortunately,
                        we were unable to verify your account due to incorrect
                        data provided during the registration process.
                        Specifically, the following information you provided did
                        not match our records:
                      </p>
                      <ul>
                        <li>Name: ${name}</li>
                        <li>Email:  ${email}</li>
                        <li>ID Card:  ${idCard}</li>
                        <li>Bus Number:  ${busNumber}</li>
                        <li>Profile Image:  ${profileImage}</li>
                      </ul>
                      <p>
                        As a result, we will need to delete your current account
                        and ask you to create a new account with the correct
                        details. We apologize for any inconvenience this may
                        cause.
                      </p>
                      <p>
                        Please note that we take the security and privacy of our
                        users very seriously and that all information provided
                        must be accurate and up-to-date. This is to ensure that
                        we can provide you with the best possible service and
                        protect the safety of all our users.
                      </p>
                      <p>
                        If you have any questions or concerns, please don't
                        hesitate to contact us at
                        <a href="mailto:contact.busmate@gmail.com">Contact</a>.
                      </p>
                      <p>Thank you for your understanding and cooperation.</p>
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

module.exports = userNotAuthenticateUserEmail;
