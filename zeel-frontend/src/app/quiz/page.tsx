"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, ArrowRight, RotateCcw, Award } from "lucide-react";

const quizData = [
    {
        question: "What is the very first thing you should do during an earthquake?",
        options: ["Run outside", "Drop, Cover, and Hold On", "Call for help", "Stand in a doorway"],
        correct: 1,
    },
    {
        question: "How long should your emergency kit last at minimum?",
        options: ["24 hours", "48 hours", "72 hours", "1 week"],
        correct: 2,
    },
    {
        question: "Which of these is NOT recommended during a lightning storm?",
        options: ["Staying indoors", "Using a corded phone", "Averting windows", "Unplugging electronics"],
        correct: 1,
    },
];

export default function QuizPage() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleNext = () => {
        if (selectedOption === quizData[step].correct) {
            setScore(score + 1);
        }

        if (step < quizData.length - 1) {
            setStep(step + 1);
            setSelectedOption(null);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-black flex items-center justify-center">
            <div className="mx-auto max-w-2xl px-4 w-full">
                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-zinc-500 font-medium tracking-widest uppercase text-xs">
                                    Question {step + 1} of {quizData.length}
                                </span>
                                <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-500"
                                        style={{ width: `${((step + 1) / quizData.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug">
                                {quizData[step].question}
                            </h2>

                            <div className="space-y-4 mb-10">
                                {quizData[step].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedOption(idx)}
                                        className={`w-full text-left p-5 rounded-2xl border transition-all ${selectedOption === idx
                                                ? "bg-blue-600/20 border-blue-500 text-white"
                                                : "bg-black/40 border-white/5 text-zinc-400 hover:border-white/20"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            <button
                                disabled={selectedOption === null}
                                onClick={handleNext}
                                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white p-5 font-bold text-black transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {step === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
                                <ArrowRight className="h-5 w-5" />
                            </button>

                            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 bg-blue-500/5 blur-3xl pointer-events-none" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-12 text-center relative overflow-hidden"
                        >
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-500 mb-8">
                                <Award className="h-10 w-10" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4">Quiz Completed!</h2>
                            <p className="text-zinc-400 text-lg mb-8">
                                You scored <span className="text-white font-bold">{score}</span> out of {quizData.length}.
                                {score === quizData.length ? " Perfect score! You're ready." : " Good job, but there's room for improvement."}
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={resetQuiz}
                                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 font-bold text-white hover:bg-white/10"
                                >
                                    <RotateCcw className="h-5 w-5" />
                                    Try Again
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white p-5 font-bold text-black hover:bg-zinc-200">
                                    <ShieldCheck className="h-5 w-5" />
                                    Get Badge
                                </button>
                            </div>

                            <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
