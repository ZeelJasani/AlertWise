import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { clerkMiddleware, requireAuth } from '@clerk/express';

import userRoutes from './routes/userRoutes';
import disasterRoutes from './routes/disaster.routes';
import quizRoutes from './routes/quiz.routes';
import sosRoutes from './routes/sos.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/disasters', disasterRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('MongoDB connected 🫡✨'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// Example protected route
app.get('/protected', requireAuth(), (req: Request, res: Response) => {
    // @ts-ignore - auth property is added by clerk middleware
    res.json({ message: "This is a protected route", userId: (req as any).auth().userId });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
