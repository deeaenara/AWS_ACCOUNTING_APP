import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import payrollRoutes from './routes/payroll.routes.js';

import './ai/reminderBot.js';
import './jobs/weeklyReport.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payroll', payrollRoutes);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Backend live on ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ DB error:', err.message));
