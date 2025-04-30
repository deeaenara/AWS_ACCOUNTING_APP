import express from 'express';
import { generatePayroll, getPayrollByStaff } from '../controllers/payroll.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();
router.post('/', authMiddleware, generatePayroll);
router.get('/:staffId', authMiddleware, getPayrollByStaff);

export default router;
