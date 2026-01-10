"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        questions: [
            { question: "", options: ["", "", "", ""], correctAnswer: 0 }
        ]
    });

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    const fetchQuiz = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quizzes/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    questions: data.questions
                });
            } else {
                toast.error("Quiz not found");
                router.push("/admin/quiz");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load quiz data");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleQuestionChange = (index: number, field: string, value: string | number) => {
        setFormData(prev => {
            const newQuestions = [...prev.questions];
            if (field === 'question') newQuestions[index].question = value as string;
            if (field === 'correctAnswer') newQuestions[index].correctAnswer = Number(value);
            return { ...prev, questions: newQuestions };
        });
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        setFormData(prev => {
            const newQuestions = [...prev.questions];
            newQuestions[qIndex].options[oIndex] = value;
            return { ...prev, questions: newQuestions };
        });
    };

    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }]
        }));
    };

    const removeQuestion = (index: number) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quizzes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Quiz updated successfully!");
                router.push("/admin/quiz");
            } else {
                const error = await res.json();
                toast.error(`Failed to update quiz: ${error.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the quiz.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/quiz"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Quiz</h1>
                    <p className="text-muted-foreground">Update content for {formData.title}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Quiz Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="bg-zinc-950 border-zinc-700"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="bg-zinc-950 border-zinc-700 min-h-[80px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="bg-zinc-950 border-zinc-700"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Questions</h2>
                        <Button type="button" variant="outline" onClick={addQuestion} className="border-zinc-700">
                            <Plus className="h-4 w-4 mr-2" /> Add Question
                        </Button>
                    </div>

                    {formData.questions.map((q, qIndex) => (
                        <Card key={qIndex} className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                                {formData.questions.length > 1 && (
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(qIndex)} className="text-zinc-500 hover:text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Question Text</label>
                                    <Input
                                        value={q.question}
                                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                        required
                                        className="bg-zinc-950 border-zinc-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Options</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {q.options.map((option, oIndex) => (
                                            <div key={oIndex} className="flex items-center gap-2">
                                                <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 cursor-pointer ${q.correctAnswer === oIndex ? "bg-green-500 border-green-500 text-white" : "border-zinc-600 text-zinc-400"}`}
                                                    onClick={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                                                >
                                                    {String.fromCharCode(65 + oIndex)}
                                                </div>
                                                <Input
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                                    required
                                                    className={`bg-zinc-950 border-zinc-700 ${q.correctAnswer === oIndex ? "border-green-500/50" : ""}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()} className="border-zinc-700">Cancel</Button>
                    <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {saving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
