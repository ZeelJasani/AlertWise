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
exports.requireAdmin = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const requireAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth().userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = yield user_model_1.default.findOne({ clerkId: userId });
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }
        next();
    }
    catch (error) {
        console.error("Admin Auth Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.requireAdmin = requireAdmin;
