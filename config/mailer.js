// config/mailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER || 'aws@aws-legalgroup',
    pass: process.env.MAIL_PASS || 'aws2025',
  },
});

export default transporter;
