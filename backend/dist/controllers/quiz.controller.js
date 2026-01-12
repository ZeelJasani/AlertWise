"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuizResult = exports.getUserQuizAttempts = exports.deleteQuiz = exports.updateQuiz = exports.createQuiz = exports.getQuizById = exports.getQuizzes = exports.getAllQuizResults = void 0;
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
const quizResult_model_1 = __importDefault(require("../models/quizResult.model"));
const getAllQuizResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield quizResult_model_1.default.find().populate('quizId', 'title').sort({ completedAt: -1 });
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching quiz results", error });
    }
});
exports.getAllQuizResults = getAllQuizResults;
const getQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield quiz_model_1.default.find();
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching quizzes", error });
    }
});
exports.getQuizzes = getQuizzes;
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield quiz_model_1.default.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching quiz", error });
    }
});
exports.getQuizById = getQuizById;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuiz = new quiz_model_1.default(req.body);
        const savedQuiz = yield newQuiz.save();
        res.status(201).json(savedQuiz);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating quiz", error });
    }
});
exports.createQuiz = createQuiz;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedQuiz = yield quiz_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedQuiz);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating quiz", error });
    }
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield quiz_model_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Quiz deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting quiz", error });
    }
});
exports.deleteQuiz = deleteQuiz;
// Check if user has taken the quiz
const getUserQuizAttempts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clerkId = req.auth().userId;
        if (!clerkId)
            return res.status(401).json({ message: "Unauthorized" });
        const attempts = yield quizResult_model_1.default.find({ userId: clerkId, quizId: req.params.id }).sort({ completedAt: -1 });
        res.json(attempts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching quiz attempts", error });
    }
});
exports.getUserQuizAttempts = getUserQuizAttempts;
// Submit a quiz result
const submitQuizResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clerkId = req.auth().userId;
        if (!clerkId)
            return res.status(401).json({ message: "Unauthorized" });
        const { score, totalQuestions } = req.body;
        const newResult = new quizResult_model_1.default({
            userId: clerkId,
            quizId: req.params.id,
            score,
            totalQuestions,
            completedAt: new Date()
        });
        yield newResult.save();
        res.status(201).json(newResult);
    }
    catch (error) {
        res.status(500).json({ message: "Error submitting quiz", error });
    }
});
exports.submitQuizResult = submitQuizResult;
