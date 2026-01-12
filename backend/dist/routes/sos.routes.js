"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("@clerk/express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const sos_controller_1 = require("../controllers/sos.controller");
const router = (0, express_1.Router)();
// User Routes
router.post('/', (0, express_2.requireAuth)(), sos_controller_1.createSOS);
router.get('/my-history', (0, express_2.requireAuth)(), sos_controller_1.getMySOS);
// Admin Routes
router.get('/all', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, sos_controller_1.getAllSOS);
router.put('/:id/status', (0, express_2.requireAuth)(), auth_middleware_1.requireAdmin, sos_controller_1.updateSOSStatus);
exports.default = router;
