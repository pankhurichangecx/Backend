const nodemailer = require('nodemailer');  //allows us to send emails from node.js applications

const sendEmail = async (options) => {
  // Create a transporter using SMTP settings or any other supported transport
  const transporter = nodemailer.createTransport({   //The transporter is responsible for connecting to your email server to send the email.
    host: 'smtp.example.com',
    port: 587,
    secure: false, // Set to true for secure connection if using SSL/TLS
    auth: {
      user: 'your_email@example.com', // Your email address
      pass: 'your_email_password', // Your email password or an app password for security
    },
  });

  // Define email options
  const mailOptions = {
    from: 'Your Name <your_email@example.com>', // Sender address
    to: options.email, // Recipient's email address
    subject: options.subject, // Email subject
    text: options.message, // Plain text body
    // html: '<p>HTML version of the email body</p>' // Uncomment and add HTML version if needed
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
