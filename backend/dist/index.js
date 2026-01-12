"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_2 = require("@clerk/express");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const disaster_routes_1 = __importDefault(require("./routes/disaster.routes"));
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const sos_routes_1 = __importDefault(require("./routes/sos.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/disasters', disaster_routes_1.default);
app.use('/api/quizzes', quiz_routes_1.default);
app.use('/api/sos', sos_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected 🫡✨'))
    .catch(err => console.error('MongoDB connection error:', err));
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Example protected route
app.get('/protected', (0, express_2.requireAuth)(), (req, res) => {
    // @ts-ignore - auth property is added by clerk middleware
    res.json({ message: "This is a protected route", userId: req.auth().userId });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
