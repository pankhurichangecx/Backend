const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) create a transporter
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // 2) Define a email options
  const mailOptions = {
    from: "Pankhuri <pankhurigarg@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) Actually send a email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;