import express from 'express';
import {
    getUsers,
    signin,
    signup,
    checkCurrentUser,
    updateUser,
} from '../controllers/users.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getUsers)
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/checkCurrentUser', auth, checkCurrentUser);
router.patch('/:id', auth, updateUser);

export default router;
