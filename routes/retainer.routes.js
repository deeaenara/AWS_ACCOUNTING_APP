import express from 'express';
import {
  addRetainer,
  fetchRetainers,
  fetchRetainerById,
  editRetainer,
  removeRetainer
} from '../controllers/retainer.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', addRetainer);
router.get('/', fetchRetainers);
router.get('/:id', fetchRetainerById);
router.put('/:id', editRetainer);
router.delete('/:id', removeRetainer);

export default router;
