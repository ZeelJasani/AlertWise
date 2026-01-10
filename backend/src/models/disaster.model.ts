import mongoose, { Schema, Document } from 'mongoose';

export interface IDisaster extends Document {
    slug: string;
    title: string;
    description: string;
    image: string;
    fullContent: string;
    tips: {
        before: string[];
        during: string[];
        after: string[];
    };
    category: 'natural' | 'safety'; // Added for differentiating Universal Safety vs Disaster
}

const DisasterSchema: Schema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    fullContent: { type: String, required: true },
    tips: {
        before: [{ type: String }],
        during: [{ type: String }],
        after: [{ type: String }],
    },
    category: { type: String, enum: ['natural', 'safety'], default: 'natural' }
}, { timestamps: true });

export default mongoose.model<IDisaster>('Disaster', DisasterSchema);
