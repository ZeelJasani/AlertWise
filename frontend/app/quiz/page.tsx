"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Quiz } from "@/types";

export default function QuizListPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quizzes`);
                if (res.ok) {
                    const data = await res.json();
                    setQuizzes(data);
                } else {
                    console.error("Failed to fetch quizzes");
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4 md:px-12 lg:px-24 max-w-6xl space-y-12">
            {/* Back Button */}
            <div>
                <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary transition-colors mb-4 group" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            {/* Header Section */}
            <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight">Test Your Knowledge</h1>
                <p className="text-muted-foreground text-lg">
                    Validate your preparedness with our interactive quizzes. Challenge yourself and ensure you&apos;re ready when it counts.
                </p>
            </div>

            {/* Quiz Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                {quizzes.map((quiz) => (
                    <Card key={quiz.id || quiz._id} className="group overflow-hidden border-muted/60 hover:border-primary/50 transition-colors duration-300 flex flex-col p-4 bg-zinc-900/50">
                        <div className="relative h-60 w-full overflow-hidden rounded-xl">
                            <Image
                                src={quiz.image}
                                alt={quiz.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardHeader className="p-0 pt-5">
                            <CardTitle className="text-2xl font-bold">{quiz.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow p-0 pt-3">
                            <CardDescription className="text-base line-clamp-3 leading-relaxed">
                                {quiz.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="p-0 pt-6">
                            <Button variant="ghost" className="w-full group/btn justify-start hover:bg-transparent hover:text-foreground transition-all px-0" asChild>
                                <Link href={`/quiz/${quiz.id || quiz._id}`} className="flex items-center gap-2 text-primary">
                                    <span className="font-semibold">Start Quiz</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
