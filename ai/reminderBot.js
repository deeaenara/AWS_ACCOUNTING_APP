import cron from 'node-cron';
import Invoice from '../models/Invoice.js';
import transporter from '../config/mailer.js';
import { sendPushNotification } from '../config/push.client.js';
import { sendWhatsApp } from '../config/whatsapp.client.js';

cron.schedule('0 7 * * *', async () => {
  try {
    const overdue = await Invoice.find({
      status: 'unpaid',
      dueDate: { $lt: new Date() }
    }).populate('client');

    for (const invoice of overdue) {
      const client = invoice.client;

      const msg = `🧾 Reminder: Invoice #${invoice._id} of AED ${invoice.total} is overdue.`;

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: client.email,
        subject: '⏰ Overdue Invoice Reminder',
        text: msg
      });

      await sendPushNotification('Overdue Invoice Alert', msg);
      await sendWhatsApp(msg, client.phone);
    }

    console.log('✅ AI Reminder Bot done');
  } catch (err) {
    console.error('❌ AI Bot error:', err.message);
  }
});
