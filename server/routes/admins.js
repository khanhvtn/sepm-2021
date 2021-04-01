import express from 'express';
import { getUsers, setVoucher, deleteUser, signin, checkCurrentAdmin, createAdmin, publishVoucher, getPublishedVoucher } from '../controllers/admins.js';

const router = express.Router();

router.patch('/setVoucher/:id', setVoucher);
router.patch('/publishVoucher/:id', publishVoucher);
router.get('/users', getUsers);
router.get('/acceptedVouchers', getPublishedVoucher)
router.delete('/users/:id', deleteUser);
router.post('/signin', signin)
router.get('/checkCurrentAdmin', checkCurrentAdmin);
router.post('/', createAdmin)


export default router;