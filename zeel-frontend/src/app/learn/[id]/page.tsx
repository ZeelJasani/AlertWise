"use client";

import { motion } from "framer-motion";
import {
    ChevronLeft,
    Play,
    Pause,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Shield,
    Video,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ModuleViewerPage() {
    const params = useParams();
    const id = params.id as string;

    const moduleName = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="pt-28 pb-12 min-h-screen bg-secondary/10 text-foreground transition-colors">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Sub-header */}
                <div className="flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
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
                            animate={{ width: "16%" }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden p-10 space-y-8 flex flex-col items-center">

                    <div className="w-full">
                        <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                            <Play className="h-8 w-8 fill-primary" />
                            Drop, Cover, and Hold On
                        </h1>
                        <p className="text-muted-foreground font-bold text-base mt-1">Duration: 2:30</p>
                    </div>

                    {/* Video Player Area */}
                    <div className="w-full aspect-video bg-secondary/30 rounded-lg border border-border flex flex-col items-center justify-center relative group">
                        <div className="flex flex-col items-center gap-6">
                            <div className="h-16 w-16 bg-white rounded-lg shadow-md border border-border flex items-center justify-center">
                                <span className="text-4xl">🏢</span>
                            </div>
                            <button className="flex items-center gap-3 bg-white border border-border px-8 py-3 rounded-lg shadow-sm hover:bg-secondary transition-all font-black text-primary uppercase tracking-widest">
                                <Pause className="h-5 w-5 fill-primary" />
                                Pause
                            </button>
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Progress: 16%</span>
                        </div>
                    </div>

                    {/* Green Continue Button (Simplified) */}
                    {/* Note: In image 4, it shows a "Continue to Quiz" button. I'll add a simplified version below */}
                    <Link
                        href="/quiz"
                        className="w-full bg-success hover:bg-success/90 py-4 rounded-lg flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-lg shadow-lg shadow-success/20 transition-all border-b-4 border-black/10 active:border-b-0 active:translate-y-1"
                    >
                        <CheckCircle2 className="h-6 w-6" />
                        Continue to Quiz
                    </Link>

                    {/* Key Safety Points */}
                    <div className="w-full pt-4 space-y-6">
                        <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Key Safety Points</h2>
                        <div className="space-y-4">
                            {[
                                "Drop to your hands and knees immediately",
                                "Take cover under a sturdy desk or table",
                                "Hold on to your shelter and protect your head",
                                "Stay away from windows and heavy objects",
                                "If outdoors, move away from buildings and power lines"
                            ].map((point, i) => (
                                <div key={i} className="flex items-center gap-3 text-primary font-bold">
                                    <div className="p-1 rounded-full bg-success/10">
                                        <CheckCircle2 className="h-5 w-5 text-success" />
                                    </div>
                                    <span className="text-base">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
