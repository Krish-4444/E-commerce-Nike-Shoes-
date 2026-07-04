// src/routes/orders.ts
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/auth';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController';

const router = Router();

// Public (admin) route to get all orders
router.get('/', protect, asyncHandler(getOrders));

// Get single order by ID (owner or admin)
router.get('/:id', protect, asyncHandler(getOrderById));

// Create a new order (authenticated user)
router.post('/', protect, asyncHandler(createOrder));

// Update order status (admin)
router.put('/:id', protect, asyncHandler(updateOrderStatus));

// Delete an order (admin)
router.delete('/:id', protect, asyncHandler(deleteOrder));

export default router;
