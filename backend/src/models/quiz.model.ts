import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface IQuiz extends Document {
    title: string;
    description: string;
    image: string;
    questions: IQuestion[];
}

const QuizSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true }
    }]
}, { timestamps: true });

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
