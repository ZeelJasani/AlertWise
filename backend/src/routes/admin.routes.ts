
import express from 'express';
import { getAdminStats } from '../controllers/admin.controller';
import { requireAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// Apply admin check to all routes in this router
router.use(requireAdmin);

router.get('/stats', getAdminStats);

export default router;
