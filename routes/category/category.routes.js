import express from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../../controllers/category/category.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.get('/', getCategories); 
router.get('/:id', getCategoryById);  

router.post('/', authorize('admin'), upload.single('image'), createCategory);  
router.put('/:id', authorize('admin'), upload.single('image'), updateCategory);  
router.delete('/:id', authorize('admin'), deleteCategory);  

export default router;
