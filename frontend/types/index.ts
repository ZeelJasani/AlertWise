export interface Disaster {
    _id?: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    category?: string;
    fullContent: string;
    tips: {
        before: string[];
        during: string[];
        after: string[];
    };
}

export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface Quiz {
    _id: string; // MongoDB ID is usually _id
    id?: string; // For backward compatibility if needed, or alias to _id
    title: string;
    description: string;
    image: string;
    questions: Question[];
}
