import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../utils/hashPassword';

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore – protect middleware adds user to request
  const userId = (req as any).user?.id;
  if (!userId) {
    res.status(401);
    throw new Error('Not authorized');
  }
  const user = await User.findById(userId).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

// @desc    Update current user profile
// @route   PUT /api/users/me
// @access  Private
export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore – protect middleware adds user to request
  const userId = (req as any).user?.id;
  if (!userId) {
    res.status(401);
    throw new Error('Not authorized');
  }
  const { name, email, password } = req.body;
  const updateData: any = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = await hashPassword(password);
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});
