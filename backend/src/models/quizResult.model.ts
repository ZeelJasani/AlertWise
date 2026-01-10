import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizResult extends Document {
    userId: string; // Clerk User ID
    quizId: mongoose.Types.ObjectId;
    score: number;
    totalQuestions: number;
    completedAt: Date;
}

const QuizResultSchema: Schema = new Schema({
    userId: { type: String, required: true },
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);
