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
exports.getAdminStats = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const sos_model_1 = __importDefault(require("../models/sos.model"));
const disaster_model_1 = __importDefault(require("../models/disaster.model"));
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
const getAdminStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield user_model_1.default.countDocuments();
        const activeSOS = yield sos_model_1.default.countDocuments({ status: 'pending' });
        const totalModules = yield disaster_model_1.default.countDocuments();
        const totalQuizzes = yield quiz_model_1.default.countDocuments();
        // Mocking recent activity for now, or fetching from logs if we had them
        const recentActivity = [
            { type: 'user', message: 'New user registered', time: '2 mins ago' },
            { type: 'sos', message: 'SOS Request from Downtown', time: '10 mins ago' },
            { type: 'system', message: 'System Backup completed', time: '1 hour ago' },
        ];
        res.status(200).json({
            totalUsers,
            activeSOS,
            totalModules,
            totalQuizzes,
            recentActivity
        });
    }
    catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Error fetching stats" });
    }
});
exports.getAdminStats = getAdminStats;
