"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy, RotateCcw, Loader2, AlertTriangle, History } from "lucide-react";
import Link from "next/link";
import { Quiz } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function QuizPage() {
    const params = useParams();
    const router = useRouter();
    const quizId = params.id as string;
    const { getToken, userId } = useAuth();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkingHistory, setCheckingHistory] = useState(true);
    const [previousAttempt, setPreviousAttempt] = useState<any>(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuizAndHistory = async () => {
            try {
                const token = await getToken();

                // Fetch Quiz Data
                const quizRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quizzes/${quizId}`);
                if (quizRes.ok) {
                    const data = await quizRes.json();
                    setQuiz(data);
                }

                // Check for previous attempts if user is logged in
                if (token) {
                    const historyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quizzes/${quizId}/attempts`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (historyRes.ok) {
                        const history = await historyRes.json();
                        if (history && history.length > 0) {
                            setPreviousAttempt(history[0]); // Get most recent attempt
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
                setCheckingHistory(false);
            }
        };

        if (quizId) {
            fetchQuizAndHistory();
        }
    }, [quizId, getToken]);

    // Warn on tab close/refresh if quiz is in progress
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!showResult && !previousAttempt && !loading && currentQuestionIndex > 0) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [showResult, previousAttempt, loading, currentQuestionIndex]);

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleCheckAnswer = () => {
        if (selectedOption === null || !quiz) return;

        const currentQuestion = quiz.questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
        }
        setIsAnswered(true);
    };

    const handleNext = async () => {
        if (!quiz) return;

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            await submitQuiz();
        }
    };

    const submitQuiz = async () => {
        if (!quiz) return;
        setSubmitting(true);
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quizzes/${quizId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    score: score,
                    totalQuestions: quiz.questions.length
                })
            });

            if (res.ok) {
                setShowResult(true);
            } else {
                toast.error("Failed to save results. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving your results.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRetake = () => {
        setPreviousAttempt(null);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    const handleExit = () => {
        router.push('/quiz');
    };

    if (loading || checkingHistory) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="container mx-auto py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
                <Button asChild>
                    <Link href="/quiz">Return to Quizzes</Link>
                </Button>
            </div>
        );
    }

    // View: Already Attempted
    if (previousAttempt && !showResult) {
        return (
            <div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-[80vh]">
                <Card className="w-full max-w-md text-center p-6 border-muted/60 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="mx-auto bg-yellow-500/10 p-4 rounded-full mb-4">
                            <History className="h-12 w-12 text-yellow-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">You already given this quiz</CardTitle>
                        <p className="text-muted-foreground">
                            You completed this quiz on {new Date(previousAttempt.completedAt).toLocaleDateString()}.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-4xl font-black text-white mb-2">
                            {previousAttempt.score} / {previousAttempt.totalQuestions}
                        </div>
                        <p className="text-sm text-zinc-500">
                            Do you want to improve your score?
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button onClick={handleRetake} className="w-full" size="lg">
                            Take Quiz Again
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/quiz">Back to Quizzes</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    // View: Results
    if (showResult) {
        return (
            <div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-[80vh]">
                <Card className="w-full max-w-md text-center p-6 border-muted/60 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                            <Trophy className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-bold mb-2">Quiz Completed!</CardTitle>
                        <p className="text-muted-foreground">
                            You scored {score} out of {quiz.questions.length}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-6xl font-black text-primary mb-6">
                            {Math.round((score / quiz.questions.length) * 100)}%
                        </div>
                        <p className="text-sm text-zinc-400">
                            {score === quiz.questions.length
                                ? "Perfect score! You are a disaster preparedness expert."
                                : score > quiz.questions.length / 2
                                    ? "Great job! You know your stuff."
                                    : "Keep learning! Review the materials and try again."}
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button onClick={handleRetake} className="w-full" size="lg">
                            <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/quiz">Back to Quizzes</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    // View: Taking Quiz
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const totalQuestions = quiz.questions.length;
    const progress = ((currentQuestionIndex) / totalQuestions) * 100;

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 max-w-4xl min-h-[85vh] flex flex-col justify-center">
            {/* Back & Progress Header */}
            <div className="mb-10 space-y-6">
                <div className="flex items-center justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-red-500 transition-colors text-muted-foreground">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                <span className="font-medium">Exit Quiz</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you really want to exit quiz?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    If you exit now, your progress will not be saved.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="border-zinc-700">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleExit} className="bg-red-600 hover:bg-red-700">Exit Quiz</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <div className="text-sm font-medium text-muted-foreground">
                        Question <span className="text-foreground">{currentQuestionIndex + 1}</span> / {totalQuestions}
                    </div>
                </div>
                <div className="space-y-2">
                    <Progress value={progress} className="h-2 w-full bg-secondary" />
                    <div className="flex justify-end">
                        <span className="text-xs text-muted-foreground">{Math.round(progress)}% completed</span>
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <Card className="border-0 shadow-2xl bg-card/60 backdrop-blur-xl ring-1 ring-white/5 overflow-hidden rounded-2xl">
                <CardHeader className="py-10 px-8 md:px-12 text-center border-b border-white/5 bg-zinc-900/40">
                    <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white mb-2">
                        {currentQuestion.question}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 md:p-12 space-y-6 bg-zinc-900/20">
                    <div className="grid gap-4 md:gap-5">
                        {currentQuestion.options.map((option, index) => {
                            let optionClass = "relative flex items-center justify-between w-full p-4 md:p-6 text-left text-base md:text-lg font-medium border-2 rounded-xl transition-all duration-200 outline-none";

                            if (isAnswered) {
                                if (index === currentQuestion.correctAnswer) {
                                    optionClass += " bg-emerald-500/10 border-emerald-500/50 text-emerald-400 opacity-100 z-10";
                                } else if (index === selectedOption) {
                                    optionClass += " bg-red-500/10 border-red-500/50 text-red-400 opacity-50";
                                } else {
                                    optionClass += " border-muted/20 text-muted-foreground opacity-50 blur-[0.5px]";
                                }
                            } else {
                                optionClass += selectedOption === index
                                    ? " border-primary bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(var(--primary),1)] z-10"
                                    : " border-muted/30 hover:border-primary/50 hover:bg-zinc-800/50 text-zinc-300 hover:text-white";
                            }

                            return (
                                <button
                                    key={index}
                                    className={optionClass}
                                    onClick={() => handleOptionSelect(index)}
                                    disabled={isAnswered}
                                >
                                    <span className="pr-8">{option}</span>
                                    {isAnswered && index === currentQuestion.correctAnswer && (
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500 absolute right-4 md:right-6 animate-in zoom-in spin-in-12 duration-300" />
                                    )}
                                    {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                                        <XCircle className="h-6 w-6 text-red-500 absolute right-4 md:right-6 animate-in zoom-in duration-300" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </CardContent>
                <CardFooter className="p-8 md:px-12 bg-zinc-950/30 flex items-center justify-between border-t border-white/5 h-24">
                    <span className="text-sm text-zinc-500 hidden md:block">
                        {isAnswered ? (
                            selectedOption === currentQuestion.correctAnswer ? "Correct answer!" : "Incorrect answer."
                        ) : "Select an option to continue"}
                    </span>
                    {!isAnswered ? (
                        <Button
                            onClick={handleCheckAnswer}
                            disabled={selectedOption === null}
                            size="lg"
                            className="w-full md:w-auto px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all ml-auto"
                        >
                            Check Answer
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            size="lg"
                            className="w-full md:w-auto px-8 py-6 text-lg font-semibold animate-in slide-in-from-right-4 fade-in duration-300 ml-auto"
                            disabled={submitting}
                        >
                            <span className="mr-2">
                                {submitting ? "Saving..." : (currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "See Results")}
                            </span>
                            {!submitting && currentQuestionIndex < totalQuestions - 1 && <ArrowRight className="h-5 w-5" />}
                            {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
