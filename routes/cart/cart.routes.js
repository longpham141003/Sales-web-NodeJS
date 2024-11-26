import express from 'express';
import { getCartByUser, addToCart, updateCart, removeFromCart } from '../../controllers/cart/cart.controller.js';
import { auth } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getCartByUser); 
router.post('/', auth, addToCart); 
router.put('/', auth, updateCart); 
router.delete('/', auth, removeFromCart); 

export default router;
