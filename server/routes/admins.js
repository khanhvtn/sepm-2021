import express from 'express';
import { getUsers, setVoucher } from '../controllers/admins.js';

const router = express.Router();

router.post('/setVoucher', setVoucher);
router.get('/users', getUsers);

export default router;