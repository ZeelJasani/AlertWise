import { Request, Response } from 'express';
import SOS from '../models/sos.model';
import User from '../models/user.model';

// User: Create SOS Request
export const createSOS = async (req: Request, res: Response) => {
    try {
        const { location, message } = req.body;
        const userId = req.auth().userId;

        // Fetch user details for the record
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newSOS = new SOS({
            userId,
            userEmail: user.email,
            userName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || "Anonymous",
            location,
            message
        });

        const savedSOS = await newSOS.save();
        res.status(201).json(savedSOS);
    } catch (error) {
        res.status(500).json({ message: "Error creating SOS request", error });
    }
};

// User: Get their own history
export const getMySOS = async (req: Request, res: Response) => {
    try {
        const failedSOS = await SOS.find({ userId: req.auth().userId }).sort({ createdAt: -1 });
        res.json(failedSOS);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error });
    }
};

// Admin: Get all SOS requests
export const getAllSOS = async (req: Request, res: Response) => {
    try {
        const allSOS = await SOS.find().sort({ createdAt: -1 });
        res.json(allSOS);
    } catch (error) {
        res.status(500).json({ message: "Error fetching SOS requests", error });
    }
};

// Admin: Update Status (Approve/Reject + Message)
export const updateSOSStatus = async (req: Request, res: Response) => {
    try {
        const { status, adminResponse } = req.body;
        const updatedSOS = await SOS.findByIdAndUpdate(
            req.params.id,
            { status, adminResponse },
            { new: true }
        );
        res.json(updatedSOS);
    } catch (error) {
        res.status(500).json({ message: "Error updating SOS status", error });
    }
};
