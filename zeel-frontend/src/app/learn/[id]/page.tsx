"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
    Play,
    Pause,
    CheckCircle2,
    ArrowLeft,
    Shield,
    Video,
    BookOpen,
    Trophy,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const moduleData: Record<string, {
    title: string;
    description: string;
    points: string[];
    quiz: {
        id: number;
        question: string;
        options: string[];
        correct: number;
    }[];
    icon: string;
}> = {
    "earthquake-safety": {
        title: "Drop, Cover, and Hold On",
        description: "Essential techniques to survive during the shaking.",
        icon: "🏢",
        points: [
            "Drop to your hands and knees immediately",
            "Take cover under a sturdy desk or table",
            "Hold on to your shelter and protect your head",
            "Stay away from windows and heavy objects",
            "If outdoors, move away from buildings and power lines"
        ],
        quiz: [
            {
                id: 1,
                question: "What is the first action you should take when you feel an earthquake?",
                options: ["Run outside immediately", "Drop to your hands and knees", "Stand in a doorway", "Call for help"],
                correct: 1,
            },
            {
                id: 2,
                question: "Where is the safest place to take cover during an earthquake indoors?",
                options: ["Near a window", "Under a sturdy desk or table", "In a doorway", "Against a wall"],
                correct: 1,
            },
            {
                id: 3,
                question: "If you are outdoors during an earthquake, you should:",
                options: ["Run into the nearest building", "Lie flat on the ground", "Move away from buildings and power lines", "Climb a tree"],
                correct: 2,
            },
        ]
    },
    "flood-safety": {
        title: "Flood Evacuation & Safety",
        description: "How to stay safe when water levels rise.",
        icon: "🌊",
        points: [
            "Move to higher ground immediately",
            "Do not walk, swim, or drive through flood waters",
            "Stay away from bridges over fast-moving water",
            "Evacuate immediately if told to do so",
            "Ensure your emergency kit is elevated"
        ],
        quiz: [
            {
                id: 1,
                question: "What is the rule of thumb for flood water depth and driving?",
                options: ["Turn around, don't drown", "Drive fast to clear the water", "Only drive if it's below the tires", "Wait for someone else to go first"],
                correct: 0,
            },
            {
                id: 2,
                question: "Where should you go if flood waters rise inside your home?",
                options: ["The basement", "The highest level (not attic)", "Out the front door", "Under the stairs"],
                correct: 1,
            },
            {
                id: 3,
                question: "Why should you avoid flood water even if it looks shallow?",
                options: ["It's cold", "Hidden debris and electrical hazards", "You might get wet", "It attracts mosquitoes"],
                correct: 1,
            }
        ]
    },
    "wildfire-safety": {
        title: "Wildfire Evacuation Protocol",
        description: "Protecting your home and family from fire.",
        icon: "🔥",
        points: [
            "Evacuate as soon as you receive an order",
            "Keep all windows and doors closed to prevent embers",
            "Wear long pants, long sleeves, and a mask",
            "Move flammable furniture away from windows",
            "Listen to local radio for the safest exit routes"
        ],
        quiz: [
            {
                id: 1,
                question: "When should you evacuate during a wildfire?",
                options: ["When you see flames near your yard", "Immediately when ordered to do so", "After packing every last item", "When the power goes out"],
                correct: 1,
            },
            {
                id: 2,
                question: "What is the primary danger of wildfires besides direct heat?",
                options: ["Smoke inhalation", "Sunburn", "Loud noise", "Loss of WiFi"],
                correct: 0,
            }
        ]
    },
    "tornado-safety": {
        title: "Seeking Tornado Shelter",
        description: "Finding the safest spot when a funnel is spotted.",
        icon: "🌪️",
        points: [
            "Go to a basement or an internal room without windows",
            "Get under a sturdy piece of furniture",
            "Use your arms to protect your head and neck",
            "Never try to outrun a tornado in a vehicle",
            "If in a mobile home, evacuate to a sturdy building"
        ],
        quiz: [
            {
                id: 1,
                question: "What is the safest room in a house during a tornado?",
                options: ["The kitchen", "The master bedroom", "An internal bathroom or closet", "The garage"],
                correct: 2,
            },
            {
                id: 2,
                question: "What should you do if you are in a car when a tornado occurs?",
                options: ["Park under a bridge", "Drive as fast as possible", "Seek shelter in a sturdy building", "Open all windows"],
                correct: 2,
            }
        ]
    },
    "cyclone-safety": {
        title: "Cyclone & Hurricane Safety",
        description: "Preparing for high-intensity wind and rain.",
        icon: "🌀",
        points: [
            "Board up windows and secure loose outdoor items",
            "Stay indoors and away from windows during the storm",
            "Have a battery-powered radio for weather updates",
            "Turn off electricity and gas if instructed",
            "Move to the strongest part of the building"
        ],
        quiz: [
            {
                id: 1,
                question: "What is the safest place to be during a cyclone?",
                options: ["On the roof", "Inside a small interior room", "Near a window to watch", "In the backyard"],
                correct: 1,
            }
        ]
    },
    "landslide-safety": {
        title: "Landslide Risk & Response",
        description: "Identifying warning signs and escaping debris flows.",
        icon: "⛰️",
        points: [
            "Stay alert for sudden changes in water flow",
            "Listen for unusual sounds like trees cracking",
            "If you suspect a landslide, evacuate immediately",
            "Curl into a ball and protect your head if caught",
            "Stay away from the slide area after it occurs"
        ],
        quiz: [
            {
                id: 1,
                question: "What is a common sign of an impending landslide?",
                options: ["Clear blue skies", "New cracks in foundations or roads", "Strong winds", "A sudden drop in temperature"],
                correct: 1,
            }
        ]
    },
    "heatwave-safety": {
        title: "Handling Extreme Heat",
        description: "Staying cool and hydrated during record temperatures.",
        icon: "☀️",
        points: [
            "Stay in air-conditioned buildings as much as possible",
            "Drink more water than usual, even if not thirsty",
            "Wear lightweight, light-colored, loose clothing",
            "Avoid strenuous outdoor activities during peak heat",
            "Check on elderly neighbors and pets frequently"
        ],
        quiz: [
            {
                id: 1,
                question: "What is the best way to prevent heatstroke?",
                options: ["Drinking soda", "Staying hydrated and in the shade", "Wearing heavy clothes", "Running a marathon"],
                correct: 1,
            }
        ]
    }
};

export default function ModuleViewerPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const quizRef = useRef<HTMLDivElement>(null);

    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [score, setScore] = useState(0);

    const currentModule = moduleData[id] || moduleData["earthquake-safety"];
    const moduleName = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const handleSelect = (questionId: number, optionIdx: number) => {
        setAnswers({ ...answers, [questionId]: optionIdx });
    };

    const isComplete = Object.keys(answers).length === currentModule.quiz.length;

    const handleSubmit = () => {
        let correctCount = 0;
        currentModule.quiz.forEach(q => {
            if (answers[q.id] === q.correct) correctCount++;
        });
        const finalScore = Math.round((correctCount / currentModule.quiz.length) * 100);
        setScore(finalScore);
        setShowScoreModal(true);
    };

    const scrollToQuiz = () => {
        quizRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="pt-28 pb-12 min-h-screen bg-secondary/10 text-foreground transition-colors overflow-x-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Sub-header */}
                <div className="flex items-center justify-between">
                    <Link href="/learn" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        <Shield className="h-6 w-6 ml-2" />
                        <span className="text-lg font-black text-primary uppercase tracking-tight">{moduleName}</span>
                    </Link>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <Video className="h-4 w-4" />
                        <span>Watching Video</span>
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
                            animate={{ width: isComplete ? "100%" : "16%" }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden p-10 space-y-8 flex flex-col items-center">

                    <div className="w-full">
                        <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                            <Play className="h-8 w-8 fill-primary" />
                            {currentModule.title}
                        </h1>
                        <p className="text-muted-foreground font-bold text-base mt-1">Status: Educational Module</p>
                    </div>

                    {/* Video Player Area */}
                    <div className="w-full aspect-video bg-secondary/30 rounded-lg border border-border flex flex-col items-center justify-center relative group">
                        <div className="flex flex-col items-center gap-6">
                            <div className="h-20 w-20 bg-white rounded-2xl shadow-md border border-border flex items-center justify-center">
                                <span className="text-5xl">{currentModule.icon}</span>
                            </div>
                            <button className="flex items-center gap-3 bg-white border border-border px-8 py-3 rounded-lg shadow-sm hover:bg-secondary transition-all font-black text-primary uppercase tracking-widest">
                                <Pause className="h-5 w-5 fill-primary" />
                                Pause
                            </button>
                            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Learning about {moduleName}</span>
                        </div>
                    </div>

                    {/* Green Continue Button (Simplified) */}
                    <button
                        onClick={scrollToQuiz}
                        className="w-full bg-success hover:bg-success/90 py-4 rounded-lg flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-lg shadow-lg shadow-success/20 transition-all border-b-4 border-black/10 active:border-b-0 active:translate-y-1"
                    >
                        <CheckCircle2 className="h-6 w-6" />
                        Go to Knowledge Check
                    </button>

                    {/* Key Safety Points */}
                    <div className="w-full pt-4 space-y-6">
                        <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Key Safety Points</h2>
                        <div className="space-y-4">
                            {currentModule.points.map((point, i) => (
                                <div key={i} className="flex items-center gap-3 text-primary font-bold">
                                    <div className="p-1 rounded-full bg-success/10">
                                        <CheckCircle2 className="h-5 w-5 text-success" />
                                    </div>
                                    <span className="text-base">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full border-t border-border mt-12 pt-12" ref={quizRef}>
                        <div className="w-full mb-10">
                            <h2 className="text-3xl font-black text-primary flex items-center gap-3">
                                <BookOpen className="h-8 w-8" />
                                Knowledge Check
                            </h2>
                            <p className="text-muted-foreground font-bold text-base mt-1">Answer the questions below to test your understanding. You need 70% to pass.</p>
                        </div>

                        {/* Questions List */}
                        <div className="space-y-12 w-full">
                            {currentModule.quiz.map((q, qIdx) => (
                                <div key={q.id} className="space-y-6">
                                    <h3 className="text-xl font-bold text-primary">
                                        {qIdx + 1}. {q.question}
                                    </h3>
                                    <div className="space-y-3">
                                        {q.options.map((option, oIdx) => (
                                            <button
                                                key={oIdx}
                                                onClick={() => handleSelect(q.id, oIdx)}
                                                className="w-full flex items-center gap-3 group text-left"
                                            >
                                                <div className={cn(
                                                    "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
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
                        <div className="pt-12 w-full">
                            <button
                                onClick={handleSubmit}
                                disabled={!isComplete}
                                className={cn(
                                    "w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all",
                                    isComplete
                                        ? "bg-success text-white hover:opacity-90 active:scale-[0.98]"
                                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                                )}
                            >
                                Submit Quiz
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Score Modal */}
            <AnimatePresence>
                {showScoreModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl overflow-hidden relative"
                        >
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className={cn(
                                    "h-24 w-24 rounded-full flex items-center justify-center",
                                    score >= 70 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                                )}>
                                    <Trophy className="h-12 w-12" />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-primary uppercase tracking-tight">
                                        {score >= 70 ? "Module Complete!" : "Keep Trying!"}
                                    </h2>
                                    <p className="text-muted-foreground font-bold">
                                        {score >= 70
                                            ? `Fantastic work! You have mastered the fundamentals of ${moduleName}.`
                                            : "You're getting there! Review the safety points and try again."}
                                    </p>
                                </div>

                                <div className="w-full bg-secondary/50 rounded-2xl py-6 flex flex-col items-center">
                                    <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Your Score</span>
                                    <span className={cn(
                                        "text-6xl font-black tabular-nums",
                                        score >= 70 ? "text-success" : "text-destructive"
                                    )}>
                                        {score}%
                                    </span>
                                </div>

                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:bg-primary/95 transition-all"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
