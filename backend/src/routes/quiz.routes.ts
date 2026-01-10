import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { requireAdmin } from '../middleware/auth.middleware';
import {
    getQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getAllQuizResults,
    getUserQuizAttempts,
    submitQuizResult
} from '../controllers/quiz.controller';

const router = Router();

// Admin Routes (Protected) - specific routes first
router.get('/results/all', requireAuth(), requireAdmin, getAllQuizResults);

// Public Routes (Anyone can take a quiz)
router.get('/', getQuizzes);
router.get('/:id', getQuizById);

// Admin Routes (Protected)
router.post('/', requireAuth(), requireAdmin, createQuiz);
router.put('/:id', requireAuth(), requireAdmin, updateQuiz);
router.put('/:id', requireAuth(), requireAdmin, updateQuiz);
router.delete('/:id', requireAuth(), requireAdmin, deleteQuiz);

// User Quiz Routes
router.get('/:id/attempts', requireAuth(), getUserQuizAttempts);
router.post('/:id/submit', requireAuth(), submitQuizResult);

export default router;
