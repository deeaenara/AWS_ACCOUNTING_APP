import cron from 'node-cron';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourfirm@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

cron.schedule('0 8 * * 1', async () => {
  await transporter.sendMail({
    from: '"LawOps Reports" <yourfirm@gmail.com>',
    to: 'owner@yourfirm.com',
    subject: '🧾 Weekly ROI Report',
    text: 'Attached is this week\'s cashflow + staff ROI.',
  });
});
