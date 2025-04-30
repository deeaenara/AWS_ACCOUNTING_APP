import express from 'express';
import { addClient, fetchClients, fetchClientById, editClient, removeClient } from '../controllers/client.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.use(protect);
router.post('/', addClient);
router.get('/', fetchClients);
router.get('/:id', fetchClientById);
router.put('/:id', editClient);
router.delete('/:id', removeClient);

export default router;
