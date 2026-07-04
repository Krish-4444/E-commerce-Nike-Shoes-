import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { Category } from '../models/Category';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
});

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json(category);
});

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json(category);
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ message: 'Category removed' });
});
