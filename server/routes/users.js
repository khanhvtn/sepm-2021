import express from 'express';
import {
    signin,
    signup,
    checkCurrentUser,
    updateUser,
    winGame,
} from '../controllers/users.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/checkCurrentUser', auth, checkCurrentUser);
router.patch('/:id', auth, updateUser);
router.post('/wingame', auth, winGame);

export default router;
