import {
  createPayroll,
  getPayrolls,
  getPayrollByUser,
  deletePayroll,
  getUserROI
} from '../services/payroll.service.js';

export const addPayroll = async (req, res) => {
  try {
    const payroll = await createPayroll(req.body);
    res.status(201).json(payroll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add payroll' });
  }
};

export const fetchPayrolls = async (req, res) => {
  try {
    const data = await getPayrolls();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load payroll data' });
  }
};

export const fetchPayrollByUser = async (req, res) => {
  try {
    const data = await getPayrollByUser(req.params.user_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch user payroll' });
  }
};

export const fetchROI = async (req, res) => {
  try {
    const roiData = await getUserROI();
    res.json(roiData);
  } catch (err) {
    res.status(500).json({ message: 'ROI calculation failed' });
  }
};

export const removePayroll = async (req, res) => {
  try {
    await deletePayroll(req.params.id);
    res.json({ message: 'Payroll deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
import { generatePayslip } from '../utils/pdf.util.js';

export const downloadPayslip = async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await getPayrollById(id);
    const user = await getUserById(payroll.user_id); // You must create this service

    const filePath = `./payslips/payslip_${id}.pdf`;
    await generatePayslip(payroll, user, filePath);

    res.download(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not generate payslip' });
  }
};
