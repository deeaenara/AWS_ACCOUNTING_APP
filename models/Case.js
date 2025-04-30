import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  title: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  status: { type: String, enum: ['open', 'closed', 'pending'], default: 'open' },
  retainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Retainer' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Case', caseSchema);
