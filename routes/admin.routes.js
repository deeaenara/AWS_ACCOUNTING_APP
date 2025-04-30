import express from 'express';
import { getAdminStats } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();
router.get('/stats', authMiddleware, getAdminStats);

export default router;
