"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("@clerk/express");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post('/sync', (0, express_2.requireAuth)(), user_controller_1.syncUser);
exports.default = router;
