const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies

// Set up your Gmail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kajalverma67454@gmail.com', // Your Gmail address
    pass: 'your-email-password' // Your Gmail app password (use App Passwords for better security)
  }
});

app.post("/send-email", (req, res) => {
  const { email, formLink } = req.body;

  const mailOptions = {
    from: 'kajalverma67454@gmail.com',
    to: email,
    subject: 'Fill Out the Contribution Form',
    text: `Hi,

Please fill out the following form to contribute:

${formLink}

Thank you for your interest!

Best regards,
Malaria-Free India Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
