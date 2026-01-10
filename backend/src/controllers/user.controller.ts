import { Request, Response } from 'express';
import User from '../models/user.model';

// Sync Clerk user to local DB
export const syncUser = async (req: Request, res: Response) => {
    try {
        const { clerkId, email, firstName, lastName, imageUrl } = req.body;

        let user = await User.findOne({ clerkId });

        if (!user) {
            user = new User({
                clerkId,
                email,
                firstName,
                lastName,
                imageUrl
            });
        } else {
            // Update existing user details
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            user.imageUrl = imageUrl;
        }

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error("Error syncing user:", error);
        res.status(500).json({ message: "Server error syncing user" });
    }
};

// Admin: Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
