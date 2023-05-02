const dataTransferEmail = (message) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Call To Action</title>
  </head>

  <body style="background: #161f33">
    ${message}
  </body>
</html>
`;
};

module.exports = dataTransferEmail;
