import mongoose from 'mongoose';

const vatConfigSchema = new mongoose.Schema({
  firm: String,
  vatRate: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('VATConfig', vatConfigSchema);
