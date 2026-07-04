import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { hashPassword, comparePassword } from '../utils/hashPassword';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email and password');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed });
  const token = generateToken(user._id);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  const token = generateToken(user._id);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// @desc    Get current logged‑in user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore – the protect middleware adds user to the request
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
