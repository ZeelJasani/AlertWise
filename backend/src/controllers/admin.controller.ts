
import { Request, Response } from 'express';
import User from '../models/user.model';
import SOS from '../models/sos.model';
import Disaster from '../models/disaster.model';
import Quiz from '../models/quiz.model';

export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const activeSOS = await SOS.countDocuments({ status: 'pending' });
        const totalModules = await Disaster.countDocuments();
        const totalQuizzes = await Quiz.countDocuments();

        // Mocking recent activity for now, or fetching from logs if we had them
        const recentActivity = [
            { type: 'user', message: 'New user registered', time: '2 mins ago' },
            { type: 'sos', message: 'SOS Request from Downtown', time: '10 mins ago' },
            { type: 'system', message: 'System Backup completed', time: '1 hour ago' },
        ];

        res.status(200).json({
            totalUsers,
            activeSOS,
            totalModules,
            totalQuizzes,
            recentActivity
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Error fetching stats" });
    }
};
