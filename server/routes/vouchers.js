import express from 'express';
import {
    getVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getVouchersByCategory
} from '../controllers/vouchers.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getVouchers);
router.get('/category/:cat', getVouchersByCategory)
router.post('/', auth, createVoucher);
router.patch('/:id', auth, updateVoucher);
router.delete('/:id', deleteVoucher);

export default router;
