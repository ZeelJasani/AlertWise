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
exports.getAllUsers = exports.syncUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// Sync Clerk user to local DB
const syncUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId, email, firstName, lastName, imageUrl } = req.body;
        let user = yield user_model_1.default.findOne({ clerkId });
        if (!user) {
            user = new user_model_1.default({
                clerkId,
                email,
                firstName,
                lastName,
                imageUrl
            });
        }
        else {
            // Update existing user details
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            user.imageUrl = imageUrl;
        }
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error syncing user:", error);
        res.status(500).json({ message: "Server error syncing user" });
    }
});
exports.syncUser = syncUser;
// Admin: Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find().sort({ createdAt: -1 });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});
exports.getAllUsers = getAllUsers;
