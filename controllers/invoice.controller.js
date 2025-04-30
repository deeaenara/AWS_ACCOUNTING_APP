import Invoice from '../models/Invoice.js';
import VATConfig from '../models/VATConfig.js';
import transporter from '../config/mailer.js';
import { sendPushNotification } from '../config/push.client.js';
import { sendWhatsApp } from '../config/whatsapp.client.js';

export const createInvoice = async (req, res) => {
  try {
    const { caseId, clientId, items } = req.body;
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const vatConfig = await VATConfig.findOne({}) || { vatRate: 5 };
    const vat = (subtotal * vatConfig.vatRate) / 100;
    const total = subtotal + vat;

    const invoice = await Invoice.create({
      case: caseId,
      client: clientId,
      items,
      subtotal,
      vat,
      total,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });

    // Notifications
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: 'client@email.com',
      subject: `🧾 Invoice Created`,
      text: `You have a new invoice totaling AED ${total}`
    });

    await sendPushNotification('📩 New Invoice', `Invoice total AED ${total}`);
    await sendWhatsApp(`🧾 Invoice generated: AED ${total}`);

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getInvoicesByClient = async (req, res) => {
  const invoices = await Invoice.find({ client: req.params.id }).populate('case');
  res.json(invoices);
};

export const markPaid = async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, { status: 'paid' }, { new: true });
  res.json(invoice);
};
