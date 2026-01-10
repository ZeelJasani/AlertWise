import { Request, Response } from 'express';
import Disaster from '../models/disaster.model';

export const getDisasters = async (req: Request, res: Response) => {
    try {
        const disasters = await Disaster.find();
        res.json(disasters);
    } catch (error) {
        res.status(500).json({ message: "Error fetching disasters", error });
    }
};

export const getDisasterBySlug = async (req: Request, res: Response) => {
    try {
        const disaster = await Disaster.findOne({ slug: req.params.slug });
        if (!disaster) {
            return res.status(404).json({ message: "Disaster not found" });
        }
        res.json(disaster);
    } catch (error) {
        res.status(500).json({ message: "Error fetching disaster", error });
    }
};

export const createDisaster = async (req: Request, res: Response) => {
    try {
        const newDisaster = new Disaster(req.body);
        const savedDisaster = await newDisaster.save();
        res.status(201).json(savedDisaster);
    } catch (error) {
        res.status(500).json({ message: "Error creating disaster", error });
    }
};

export const updateDisaster = async (req: Request, res: Response) => {
    try {
        const updatedDisaster = await Disaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDisaster);
    } catch (error) {
        res.status(500).json({ message: "Error updating disaster", error });
    }
};

export const deleteDisaster = async (req: Request, res: Response) => {
    try {
        await Disaster.findByIdAndDelete(req.params.id);
        res.json({ message: "Disaster deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting disaster", error });
    }
};
