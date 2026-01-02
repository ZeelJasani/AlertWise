"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const quizData = [
    {
        id: 1,
        question: "What is the first action you should take when you feel an earthquake?",
        options: [
            "Run outside immediately",
            "Drop to your hands and knees",
            "Stand in a doorway",
            "Call for help"
        ],
        correct: 1,
    },
    {
        id: 2,
        question: "Where is the safest place to take cover during an earthquake indoors?",
        options: [
            "Near a window",
            "Under a sturdy desk or table",
            "In a doorway",
            "Against a wall"
        ],
        correct: 1,
    },
    {
        id: 3,
        question: "If you are outdoors during an earthquake, you should:",
        options: [
            "Run into the nearest building",
            "Lie flat on the ground",
            "Move away from buildings and power lines",
            "Climb a tree"
        ],
        correct: 2,
    },
];

export default function QuizPage() {
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const handleSelect = (questionId: number, optionIdx: number) => {
        setAnswers({ ...answers, [questionId]: optionIdx });
    };

    const isComplete = Object.keys(answers).length === quizData.length;

    return (
        <div className="pt-28 pb-12 min-h-screen bg-secondary/10 text-foreground transition-colors">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Sub-header */}
                <div className="flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        <Shield className="h-6 w-6 ml-2" />
                        <span className="text-lg font-black text-primary uppercase tracking-tight">Earthquake Safety</span>
                    </Link>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <span>Taking Quiz</span>
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black text-primary uppercase tracking-widest">
                        <span>Module Progress</span>
                    </div>
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden p-10 space-y-10">

                    <div className="w-full">
                        <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                            <BookOpen className="h-8 w-8" />
                            Knowledge Check
                        </h1>
                        <p className="text-muted-foreground font-bold text-base mt-1">Answer the questions below to test your understanding. You need 70% to pass.</p>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-12">
                        {quizData.map((q, qIdx) => (
                            <div key={q.id} className="space-y-6">
                                <h3 className="text-xl font-bold text-primary">
                                    {qIdx + 1}. {q.question}
                                </h3>
                                <div className="space-y-3">
                                    {q.options.map((option, oIdx) => (
                                        <button
                                            key={oIdx}
                                            onClick={() => handleSelect(q.id, oIdx)}
                                            className="w-full flex items-center gap-3 group"
                                        >
                                            <div className={cn(
                                                "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                answers[q.id] === oIdx
                                                    ? "border-primary bg-primary"
                                                    : "border-muted-foreground/30 group-hover:border-primary/50"
                                            )}>
                                                {answers[q.id] === oIdx && <div className="h-2 w-2 rounded-full bg-white" />}
                                            </div>
                                            <span className={cn(
                                                "text-base font-medium transition-colors",
                                                answers[q.id] === oIdx ? "text-primary font-bold" : "text-muted-foreground group-hover:text-primary"
                                            )}>
                                                {option}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            disabled={!isComplete}
                            className={cn(
                                "w-full py-4 rounded-lg flex items-center justify-center gap-3 font-black uppercase tracking-widest text-lg shadow-lg transition-all border-b-4",
                                isComplete
                                    ? "bg-success text-white hover:bg-success/90 shadow-success/20 border-black/10 active:border-b-0 active:translate-y-1"
                                    : "bg-success/40 text-white/70 border-transparent cursor-not-allowed"
                            )}
                        >
                            Submit Quiz
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
