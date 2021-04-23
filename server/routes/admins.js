import express from 'express';
import { getUsers, setVoucher, deleteUser, getActiveVoucher, signin, checkCurrentAdmin, createAdmin, publishVoucher, getPublishedVoucher } from '../controllers/admins.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.patch('/setVoucher/:id', setVoucher);
router.patch('/publishVoucher/:id', publishVoucher);
router.get('/users', getUsers);
router.get('/acceptedVouchers', getActiveVoucher)
router.get('/publishedVouchers', getPublishedVoucher)
router.delete('/users/:id', deleteUser);
router.post('/signin', signin)
router.get('/checkCurrentAdmin', auth, checkCurrentAdmin);
router.post('/', createAdmin)


export default router;