import express from 'express';
import {
    getVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
} from '../controllers/vouchers.js';

const router = express.Router();

router.get('/', getVouchers);
router.post('/', createVoucher);
router.patch('/:id', updateVoucher);
router.delete('/:id', deleteVoucher);

export default router;
