import { Request, Response } from 'express';
import Quiz from '../models/quiz.model';
import QuizResult from '../models/quizResult.model';

export const getAllQuizResults = async (req: Request, res: Response) => {
    try {
        const results = await QuizResult.find().populate('quizId', 'title').sort({ completedAt: -1 });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz results", error });
    }
};

export const getQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quizzes", error });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz", error });
    }
};

export const createQuiz = async (req: Request, res: Response) => {
    try {
        const newQuiz = new Quiz(req.body);
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(500).json({ message: "Error creating quiz", error });
    }
};

export const updateQuiz = async (req: Request, res: Response) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ message: "Error updating quiz", error });
    }
};

export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting quiz", error });
    }
};
// Check if user has taken the quiz
export const getUserQuizAttempts = async (req: Request, res: Response) => {
    try {
        const clerkId = req.auth().userId;
        if (!clerkId) return res.status(401).json({ message: "Unauthorized" });

        const attempts = await QuizResult.find({ userId: clerkId, quizId: req.params.id }).sort({ completedAt: -1 });
        res.json(attempts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz attempts", error });
    }
};

// Submit a quiz result
export const submitQuizResult = async (req: Request, res: Response) => {
    try {
        const clerkId = req.auth().userId;
        if (!clerkId) return res.status(401).json({ message: "Unauthorized" });

        const { score, totalQuestions } = req.body;

        const newResult = new QuizResult({
            userId: clerkId,
            quizId: req.params.id,
            score,
            totalQuestions,
            completedAt: new Date()
        });

        await newResult.save();
        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ message: "Error submitting quiz", error });
    }
};
