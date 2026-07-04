// src/controllers/orderController.ts
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { Order } from '../models/Order';

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private (admin)
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find().populate('user', 'id name').populate('products.product', 'id name price');
  res.json(orders);
});

// @desc    Get single order by ID (owner or admin)
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'id name')
    .populate('products.product', 'id name price');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(order);
});

// @desc    Create a new order (authenticated user)
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  // Assume protect middleware adds req.user with id
  // @ts-ignore
  const userId = req.user?.id;
  if (!userId) {
    res.status(401);
    throw new Error('Not authorized');
  }
  const { products, total } = req.body;
  const order = await Order.create({ user: userId, products, total, status: 'pending' });
  res.status(201).json(order);
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id
// @access  Private (admin)
export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(order);
});

// @desc    Delete an order (admin)
// @route   DELETE /api/orders/:id
// @access  Private (admin)
export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ message: 'Order removed' });
});
