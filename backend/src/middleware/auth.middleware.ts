import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';

// Extend Express Request interface to include auth property from Clerk
declare global {
    namespace Express {
        interface Request {
            auth: {
                userId: string;
                sessionId: string;
                getToken: () => Promise<string | null>;
            };
        }
    }
}

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.auth.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        next();
    } catch (error) {
        console.error("Admin Auth Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
