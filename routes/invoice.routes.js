import express from 'express';
import { createInvoice, getInvoicesByClient, markPaid } from '../controllers/invoice.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();
router.post('/', authMiddleware, createInvoice);
router.get('/client/:id', authMiddleware, getInvoicesByClient);
router.put('/:id/mark-paid', authMiddleware, markPaid);

export default router;
