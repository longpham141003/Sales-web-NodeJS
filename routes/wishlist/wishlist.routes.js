import express from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../../controllers/wishlist/wishlist.controller.js';
import { auth } from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js'; 

const router = express.Router();

router.post('/add', auth, addToWishlist);  
router.get('/', auth, getWishlist);
router.delete('/:productId', auth, removeFromWishlist);

export default router;
