import mongoose, { Schema, Document } from 'mongoose';

export interface ISOS extends Document {
    userId: string; // Clerk User ID
    userEmail: string;
    userName: string;
    location: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    adminResponse?: string;
    createdAt: Date;
    updatedAt: Date;
}

const SOSSchema: Schema = new Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    location: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminResponse: { type: String }
}, { timestamps: true });

export default mongoose.model<ISOS>('SOS', SOSSchema);
