import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['client', 'staff', 'admin', 'super_admin'],
    default: 'client'
  },
  firm: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
