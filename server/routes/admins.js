import express from 'express';
import { getUsers, setVoucher, deleteUser, signin } from '../controllers/admins.js';

const router = express.Router();

router.patch('/setVoucher/:id', setVoucher);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.post('/signin', signin)

export default router;