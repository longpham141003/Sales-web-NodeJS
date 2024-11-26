import express from 'express';
import { checkout, updateCheckout, deleteCheckout, getCheckoutById, getAllCheckouts, getAllCheckoutsByUser } from '../../controllers/checkout/checkout.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, checkout);
router.put('/:id', auth, updateCheckout);
router.delete('/:id', auth, deleteCheckout);
router.get('/:id', auth, getCheckoutById);
router.get('/my-orders', auth, getAllCheckoutsByUser);
router.get('/', authorize('admin'), getAllCheckouts);

export default router;
