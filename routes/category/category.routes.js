import express from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../../controllers/category/category.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js';
import { validate } from '../../middlewares/validate.js';
import { createCategorySchema } from '../../validations/category.validation.js';

const router = express.Router();

router.get('/', getCategories); 
router.get('/:id', getCategoryById);  

router.post('/',validate(createCategorySchema), authorize('admin'), upload.single('image'), createCategory);  
router.put('/:id',validate(createCategorySchema), authorize('admin'), upload.single('image'), updateCategory);  
router.delete('/:id', authorize('admin'), deleteCategory);  

export default router;
