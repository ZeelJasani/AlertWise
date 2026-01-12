"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("@clerk/express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const disaster_controller_1 = require("../controllers/disaster.controller");
const router = (0, express_1.Router)();
// Public Routes (Anyone can learn)
router.get('/', disaster_controller_1.getDisasters);
router.get('/:slug', disaster_controller_1.getDisasterBySlug);
// Admin Routes (Protected)
router.post('/', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, disaster_controller_1.createDisaster);
router.put('/:id', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, disaster_controller_1.updateDisaster);
router.delete('/:id', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, disaster_controller_1.deleteDisaster);
exports.default = router;
