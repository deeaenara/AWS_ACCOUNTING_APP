import Payroll from '../models/Payroll.js';
import Invoice from '../models/Invoice.js';
import User from '../models/User.js';
import { generatePayslip } from '../pdf/payslip.generator.js';

export const generatePayroll = async (req, res) => {
  const { staffId, month, salary } = req.body;
  const staff = await User.findById(staffId);
  const invoices = await Invoice.find({
    issuedAt: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) },
    status: 'paid'
  });

  const totalInvoiced = invoices.reduce((sum, i) => sum + i.total, 0);
  const roi = totalInvoiced ? ((totalInvoiced - salary) / salary) * 100 : 0;

  const payroll = await Payroll.create({ staff: staffId, month, salary, totalInvoiced, roi });
  const payslipUrl = await generatePayslip(payroll, staff);
  payroll.payslipUrl = payslipUrl;
  await payroll.save();

  res.status(201).json(payroll);
};

export const getPayrollByStaff = async (req, res) => {
  const payroll = await Payroll.find({ staff: req.params.staffId });
  res.json(payroll);
};
