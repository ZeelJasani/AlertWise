"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("@clerk/express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const quiz_controller_1 = require("../controllers/quiz.controller");
const router = (0, express_1.Router)();
// Admin Routes (Protected) - specific routes first
router.get('/results/all', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, quiz_controller_1.getAllQuizResults);
// Public Routes (Anyone can take a quiz)
router.get('/', quiz_controller_1.getQuizzes);
router.get('/:id', quiz_controller_1.getQuizById);
// Admin Routes (Protected)
router.post('/', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, quiz_controller_1.createQuiz);
router.put('/:id', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, quiz_controller_1.updateQuiz);
router.put('/:id', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, quiz_controller_1.updateQuiz);
router.delete('/:id', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, quiz_controller_1.deleteQuiz);
// User Quiz Routes
router.get('/:id/attempts', (0, express_2.requireAuth)(), quiz_controller_1.getUserQuizAttempts);
router.post('/:id/submit', (0, express_2.requireAuth)(), quiz_controller_1.submitQuizResult);
exports.default = router;
