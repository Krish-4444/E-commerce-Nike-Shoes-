import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/auth';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const router = Router();

// Public routes
router.get('/', asyncHandler(getCategories));
router.get('/:id', asyncHandler(getCategoryById));

// Protected routes
router.post('/', protect, asyncHandler(createCategory));
router.put('/:id', protect, asyncHandler(updateCategory));
router.delete('/:id', protect, asyncHandler(deleteCategory));

export default router;
