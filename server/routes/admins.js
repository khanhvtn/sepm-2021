import express from 'express';
import { getUsers, setVoucher, deleteUser } from '../controllers/admins.js';

const router = express.Router();

router.patch('/setVoucher/:id', setVoucher);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

export default router;