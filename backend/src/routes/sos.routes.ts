import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { requireAdmin } from '../middleware/auth.middleware';
import {
    createSOS,
    getMySOS,
    getAllSOS,
    updateSOSStatus
} from '../controllers/sos.controller';

const router = Router();

// User Routes
router.post('/', requireAuth(), createSOS);
router.get('/my-history', requireAuth(), getMySOS);

// Admin Routes
router.get('/all', requireAuth(), requireAdmin, getAllSOS);
router.put('/:id/status', requireAuth(), requireAdmin, updateSOSStatus);

export default router;
