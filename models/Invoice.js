import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      description: String,
      amount: Number
    }
  ],
  subtotal: Number,
  vat: Number,
  total: Number,
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  issuedAt: { type: Date, default: Date.now },
  dueDate: Date,
  pdfUrl: String
});

export default mongoose.model('Invoice', invoiceSchema);
