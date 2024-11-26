import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../controllers/product/product.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js'; // Middleware xử lý ảnh

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', authorize('admin'), upload.array('images', 10), createProduct);
router.put('/:id', authorize('admin'), upload.array('images', 10), updateProduct); 
router.delete('/:id', authorize('admin'), deleteProduct); 

export default router;
