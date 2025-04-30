import mongoose from 'mongoose';

const retainerSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  balance: Number,
  currency: { type: String, default: 'AED' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Retainer', retainerSchema);
