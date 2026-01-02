"use client";

import {
    Shield,
    BookOpen,
    Trophy,
    MessageCircle,
    FileText,
    Zap,
    Users,
    Flame,
    Droplets,
    AlertTriangle,
    Wind,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SahayakModal from "@/components/SahayakModal";
import { motion } from "framer-motion";

const modules = [
    {
        id: "earthquake-safety",
        title: "Earthquake Safety",
        description: "Learn drop, cover, and hold techniques",
        progress: 67,
        lessons: "8/12",
        badges: 3,
        icon: Shield,
        color: "bg-orange-500",
    },
    {
        id: "fire-lab-safety",
        title: "Fire & Lab Safety",
        description: "Fire evacuation and lab safety protocols",
        progress: 63,
        lessons: "5/8",
        badges: 2,
        icon: Flame,
        color: "bg-red-500",
    },
    {
        id: "flood-preparedness",
        title: "Flood Preparedness",
        description: "Flood safety and evacuation procedures",
        progress: 30,
        lessons: "3/10",
        badges: 1,
        icon: Droplets,
        color: "bg-blue-500",
    },
    {
        id: "medical-emergencies",
        title: "Medical Emergencies",
        description: "First aid and emergency medical response",
        progress: 80,
        lessons: "12/15",
        badges: 4,
        icon: Shield,
        color: "bg-pink-500",
    },
    {
        id: "security-threats",
        title: "Security Threats",
        description: "Personal and campus security awareness",
        progress: 0,
        lessons: "0/6",
        badges: 0,
        icon: AlertTriangle,
        color: "bg-purple-500",
    },
    {
        id: "weather-emergencies",
        title: "Weather Emergencies",
        description: "Storm, cyclone, and weather safety",
        progress: 78,
        lessons: "7/9",
        badges: 2,
        icon: Wind,
        color: "bg-slate-500",
    },
];

export default function DashboardPage() {
    const [isSahayakOpen, setIsSahayakOpen] = useState(false);

    return (
        <div className="pt-28 pb-12 min-h-screen bg-secondary/30 text-foreground px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Hero & Safety Score */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Welcome Card */}
                    <div className="lg:col-span-2 bg-white border border-border rounded-xl p-8 shadow-sm flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Welcome back, Guna!</h1>
                            <p className="text-muted-foreground font-medium mb-10">Ready to enhance your disaster preparedness skills?</p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-primary">Overall Progress</span>
                                        <span className="text-muted-foreground">58%</span>
                                    </div>
                                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "58%" }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-8">
                                    <div className="flex items-center gap-2 text-sm font-bold text-primary">
                                        <div className="p-1.5 rounded-lg bg-primary/5">
                                            <BookOpen className="h-4 w-4" />
                                        </div>
                                        <span>35 of 60 lessons completed</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-success">
                                        <div className="p-1.5 rounded-lg bg-success/5">
                                            <Trophy className="h-4 w-4" />
                                        </div>
                                        <span>12 badges earned</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Safety Score Card */}
                    <div className="bg-white border border-border rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center mb-6">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Background Circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="44"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-secondary"
                                />
                                {/* Progress Circle */}
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="44"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray="276.46"
                                    initial={{ strokeDashoffset: 276.46 }}
                                    animate={{ strokeDashoffset: 276.46 * (1 - 0.78) }}
                                    strokeLinecap="round"
                                    className="text-orange-500"
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-primary leading-none">78</span>
                                <span className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-[0.15em] mt-2">Safety Score</span>
                            </div>
                        </div>
                        <span className="text-2xl font-black text-orange-500 uppercase tracking-tight">Good</span>
                    </div>
                </div>

                {/* Modules Grid */}
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-8">Learning Modules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((module) => (
                            <Link
                                key={module.id}
                                href={`/learn/${module.id}`}
                                className="group bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 relative"
                            >
                                <div className="flex justify-between items-start">
                                    <div className={cn("p-2.5 rounded-xl text-white shadow-sm", module.color)}>
                                        <module.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-success text-[11px] font-black text-white">
                                        <Trophy className="h-3 w-3" /> {module.badges}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors uppercase tracking-tight">{module.title}</h3>
                                    <p className="text-sm text-muted-foreground font-medium mt-1">{module.description}</p>
                                </div>

                                <div className="mt-2 space-y-3">
                                    <div className="flex justify-between text-xs font-black">
                                        <span className="text-primary uppercase tracking-tighter">Progress</span>
                                        <span className="text-muted-foreground">{module.lessons}</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${module.progress}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest block">
                                        {module.progress}% completed
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Activity & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold text-primary">Recent Activity</h2>
                        <div className="bg-white border border-border rounded-xl shadow-sm divide-y divide-border">
                            {[
                                { title: "First Aid Champion", time: "2 hours ago", desc: "Completed Medical Emergencies module", icon: Trophy, color: "text-success" },
                                { title: "Fire Drill Completed", time: "1 day ago", desc: "Response time: 2 minutes 45 seconds", icon: Zap, color: "text-orange-500" },
                                { title: "Earthquake Safety Module", time: "3 days ago", desc: "Quiz score: 85% - Well done!", icon: BookOpen, color: "text-primary" },
                            ].map((activity, i) => (
                                <div key={i} className="p-6 flex gap-4 items-start hover:bg-secondary/10 transition-colors">
                                    <div className={cn("p-2 rounded-lg bg-secondary/50", activity.color)}>
                                        <activity.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-primary text-base leading-tight">{activity.title}</h4>
                                            <span className="text-xs text-muted-foreground font-medium">{activity.time}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium mt-1">{activity.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-primary">Quick Actions</h2>
                        <div className="space-y-4">
                            {[
                                { icon: FileText, label: "My Notes" },
                                { icon: Zap, label: "Quick Quiz" },
                                { icon: Users, label: "Peer Comparison" },
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className="w-full flex items-center justify-between p-5 rounded-xl bg-white border border-border shadow-sm hover:border-primary/20 hover:bg-secondary/10 transition-all text-left group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/5 transition-colors">
                                            <action.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-sm font-bold text-primary">{action.label}</span>
                                    </div>
                                    <Wind className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Sahayak AI Assistant Floating Button */}
            <button
                onClick={() => setIsSahayakOpen(true)}
                className="fixed bottom-8 right-8 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-40"
            >
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="absolute -top-12 right-0 bg-white text-primary text-[10px] sm:text-xs font-black px-3 py-2 rounded-xl shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest">
                    Ask Sahayak
                </span>
            </button>

            <SahayakModal isOpen={isSahayakOpen} onClose={() => setIsSahayakOpen(false)} />
        </div>
    );
}
