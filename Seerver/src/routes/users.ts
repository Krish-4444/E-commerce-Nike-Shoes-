import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);

export default router;
