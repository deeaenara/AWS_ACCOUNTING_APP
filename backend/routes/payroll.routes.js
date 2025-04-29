import express from 'express';
import {
  addPayroll,
  fetchPayrolls,
  fetchPayrollByUser,
  removePayroll,
  fetchROI
} from '../controllers/payroll.controller.js';

import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.post('/', authorize('super_admin'), addPayroll);
router.get('/', authorize('super_admin'), fetchPayrolls);
router.get('/roi', authorize('super_admin'), fetchROI);
router.get('/:user_id', fetchPayrollByUser);
router.delete('/:id', authorize('super_admin'), removePayroll);

export default router;
