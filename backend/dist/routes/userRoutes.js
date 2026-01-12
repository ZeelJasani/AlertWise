"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("@clerk/express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post('/sync', (0, express_2.requireAuth)(), user_controller_1.syncUser);
// Admin: List all users
router.get('/', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, user_controller_1.getAllUsers);
exports.default = router;
