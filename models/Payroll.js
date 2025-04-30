import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  month: String,
  salary: Number,
  totalInvoiced: Number,
  roi: Number,
  paid: { type: Boolean, default: false },
  payslipUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payroll', payrollSchema);
