// routes/wishlist.js
import express from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../../controllers/wishlist/wishlist.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { addToWishlistSchema } from '../../validations/wishlist.validation.js';

const router = express.Router();

router.post('/add', auth, validate(addToWishlistSchema), addToWishlist);
router.get('/', auth, getWishlist);
router.delete('/:productId', auth, removeFromWishlist);

export default router;
