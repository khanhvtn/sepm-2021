import express from 'express';
import {
    getVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
} from '../controllers/vouchers.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getVouchers);
router.post('/', auth, createVoucher);
router.patch('/:id', auth, updateVoucher);
router.delete('/:id', auth, deleteVoucher);

export default router;
