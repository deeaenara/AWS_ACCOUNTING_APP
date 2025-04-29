import express from 'express';
import { addCase, fetchCases, fetchCaseById, editCase, removeCase } from '../controllers/case.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.use(protect);
router.post('/', addCase);
router.get('/', fetchCases);
router.get('/:id', fetchCaseById);
router.put('/:id', editCase);
router.delete('/:id', removeCase);

export default router;
