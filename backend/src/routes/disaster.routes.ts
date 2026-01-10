import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { requireAdmin } from '../middleware/auth.middleware';
import {
    getDisasters,
    getDisasterBySlug,
    createDisaster,
    updateDisaster,
    deleteDisaster
} from '../controllers/disaster.controller';

const router = Router();

// Public Routes (Anyone can learn)
router.get('/', getDisasters);
router.get('/:slug', getDisasterBySlug);

// Admin Routes (Protected)
router.post('/', requireAuth(), requireAdmin, createDisaster);
router.put('/:id', requireAuth(), requireAdmin, updateDisaster);
router.delete('/:id', requireAuth(), requireAdmin, deleteDisaster);

export default router;
