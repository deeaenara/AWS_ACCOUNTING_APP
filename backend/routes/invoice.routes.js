import express from 'express';
import { addInvoice, fetchInvoices, fetchInvoiceById, editInvoice, removeInvoice } from '../controllers/invoice.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.use(protect);
router.post('/', addInvoice);
router.get('/', fetchInvoices);
router.get('/:id', fetchInvoiceById);
router.put('/:id', editInvoice);
router.delete('/:id', removeInvoice);

export default router;
