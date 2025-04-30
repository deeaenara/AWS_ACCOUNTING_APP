import cron from 'node-cron';
import Invoice from '../models/Invoice.js';
import Payroll from '../models/Payroll.js';
import transporter from '../config/mailer.js';

cron.schedule('0 8 * * 1', async () => {
  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const invoices = await Invoice.find({ issuedAt: { $gte: weekAgo } });
    const payroll = await Payroll.find({ createdAt: { $gte: weekAgo } });

    const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0);
    const totalSalary = payroll.reduce((sum, p) => sum + p.salary, 0);

    const msg = `
🧾 Weekly Report – ${new Date().toDateString()}
Revenue: AED ${totalRevenue}
Payroll: AED ${totalSalary}
Invoices: ${invoices.length}
Payroll entries: ${payroll.length}
`;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: 'owner@aws-legalgroup.com',
      subject: '📊 Weekly LawFirm Report',
      text: msg
    });

    console.log('✅ Weekly Report sent');
  } catch (err) {
    console.error('❌ Weekly Report error:', err.message);
  }
});
