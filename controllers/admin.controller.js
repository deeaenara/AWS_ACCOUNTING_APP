import Invoice from '../models/Invoice.js';
import Payroll from '../models/Payroll.js';
import User from '../models/User.js';
import Case from '../models/Case.js';

export const getAdminStats = async (req, res) => {
  try {
    const clients = await User.countDocuments({ role: 'client' });
    const staff = await User.countDocuments({ role: 'staff' });
    const totalCases = await Case.countDocuments();
    const unpaidInvoices = await Invoice.countDocuments({ status: 'unpaid' });
    const paidInvoices = await Invoice.find({ status: 'paid' });

    const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0);
    const payroll = await Payroll.aggregate([{ $group: { _id: null, total: { $sum: '$salary' } } }]);

    res.json({
      clients,
      staff,
      totalCases,
      unpaidInvoices,
      totalRevenue,
      payrollThisYear: payroll[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
