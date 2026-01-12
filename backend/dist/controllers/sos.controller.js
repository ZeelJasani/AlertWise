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
exports.updateSOSStatus = exports.getAllSOS = exports.getMySOS = exports.createSOS = void 0;
const sos_model_1 = __importDefault(require("../models/sos.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// User: Create SOS Request
const createSOS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, message } = req.body;
        const userId = req.auth().userId;
        // Fetch user details for the record
        const user = yield user_model_1.default.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newSOS = new sos_model_1.default({
            userId,
            userEmail: user.email,
            userName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || "Anonymous",
            location,
            message
        });
        const savedSOS = yield newSOS.save();
        res.status(201).json(savedSOS);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating SOS request", error });
    }
});
exports.createSOS = createSOS;
// User: Get their own history
const getMySOS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const failedSOS = yield sos_model_1.default.find({ userId: req.auth().userId }).sort({ createdAt: -1 });
        res.json(failedSOS);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching history", error });
    }
});
exports.getMySOS = getMySOS;
// Admin: Get all SOS requests
const getAllSOS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSOS = yield sos_model_1.default.find().sort({ createdAt: -1 });
        res.json(allSOS);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching SOS requests", error });
    }
});
exports.getAllSOS = getAllSOS;
// Admin: Update Status (Approve/Reject + Message)
const updateSOSStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, adminResponse } = req.body;
        const updatedSOS = yield sos_model_1.default.findByIdAndUpdate(req.params.id, { status, adminResponse }, { new: true });
        res.json(updatedSOS);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating SOS status", error });
    }
});
exports.updateSOSStatus = updateSOSStatus;
