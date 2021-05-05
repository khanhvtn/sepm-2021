import express from 'express';
import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    signup,
    signin,
    checkCurrentBrand,
    getBrand
} from '../controllers/brands.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getBrands);
router.get('/information/:id', getBrand);
router.post('/', createBrand);
router.patch('/:id', updateBrand);
router.delete('/:id', deleteBrand);
router.post('/signin', signin);
router.post('/signup', signup)
router.get('/checkCurrentBrand', auth, checkCurrentBrand)

export default router;
