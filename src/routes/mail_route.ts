import express from 'express';
import nodemailer from 'nodemailer';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS,
    }
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const mailOptions = {
    from: process.env.EMAILUSER,
    to: email,
    subject: 'Password Reset',
    text: `Your password is: ${password}` // Changed 'message' to 'text'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

router.post('/send-email', sendEmail);

export default router;
