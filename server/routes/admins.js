import express from 'express';
import { getUsers, setVoucher, deleteUser } from '../controllers/admins.js';

const router = express.Router();

router.post('/setVoucher', setVoucher);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

export default router;