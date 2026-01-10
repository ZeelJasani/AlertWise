import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { requireAdmin } from '../middleware/auth.middleware';
import { syncUser, getAllUsers } from '../controllers/user.controller';

const router = Router();

router.post('/sync', requireAuth(), syncUser);

// Admin: List all users
router.get('/', requireAuth(), requireAdmin, getAllUsers);

export default router;
