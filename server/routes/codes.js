import express from 'express'
import {
   getCodes,
   createCode,
   deleteCode,
   updateCode
   
    
    
} from '../controllers/codes.js'
import auth from '../middlewares/auth.js'
const router = express.Router();

router.get('/',getCodes);
router.post('/',createCode);
router.delete('/:id',deleteCode);
router.patch('/:id',updateCode);



export default router;