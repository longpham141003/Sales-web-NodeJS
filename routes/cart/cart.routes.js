import express from 'express';
import { getCartByUser, addToCart, updateCart, removeFromCart } from '../../controllers/cart/cart.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { addToCartSchema, updateCartSchema } from '../../validations/cart.validation.js';
const router = express.Router();

router.get('/', auth, getCartByUser); 
router.post('/', auth, validate(addToCartSchema), addToCart);
router.put('/', auth, validate(updateCartSchema), updateCart);
router.delete('/', auth, removeFromCart); 

export default router;
