import express from 'express'
import {
    getHistories,
    createHistory,
    deleteHistory
    
} from '../controllers/history.js'
import auth from '../middlewares/auth.js'
const router = express.Router();

router.get('/',getHistories);
router.post('/',auth,createHistory);
router.delete('/:id',auth,deleteHistory);



export default router;