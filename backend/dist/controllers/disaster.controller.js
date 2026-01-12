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
exports.deleteDisaster = exports.updateDisaster = exports.createDisaster = exports.getDisasterBySlug = exports.getDisasters = void 0;
const disaster_model_1 = __importDefault(require("../models/disaster.model"));
const getDisasters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const disasters = yield disaster_model_1.default.find();
        res.json(disasters);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching disasters", error });
    }
});
exports.getDisasters = getDisasters;
const getDisasterBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const disaster = yield disaster_model_1.default.findOne({ slug: req.params.slug });
        if (!disaster) {
            return res.status(404).json({ message: "Disaster not found" });
        }
        res.json(disaster);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching disaster", error });
    }
});
exports.getDisasterBySlug = getDisasterBySlug;
const createDisaster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDisaster = new disaster_model_1.default(req.body);
        const savedDisaster = yield newDisaster.save();
        res.status(201).json(savedDisaster);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating disaster", error });
    }
});
exports.createDisaster = createDisaster;
const updateDisaster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDisaster = yield disaster_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDisaster);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating disaster", error });
    }
});
exports.updateDisaster = updateDisaster;
const deleteDisaster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield disaster_model_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Disaster deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting disaster", error });
    }
});
exports.deleteDisaster = deleteDisaster;
