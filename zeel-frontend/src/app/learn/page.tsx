"use client";

import { motion } from "framer-motion";
import { Search, ChevronRight, Wind, Waves, Ghost, Flame } from "lucide-react";
import Link from "next/link";

const articles = [
    {
        title: "Earthquake Survival Guide",
        category: "Natural Disasters",
        duration: "10 min read",
        icon: Ghost,
        color: "text-amber-500",
    },
    {
        title: "Flood Preparedness 101",
        category: "Safety",
        duration: "15 min read",
        icon: Waves,
        color: "text-blue-500",
    },
    {
        title: "Wildfire Response Protocol",
        category: "Emergency",
        duration: "12 min read",
        icon: Flame,
        color: "text-orange-500",
    },
    {
        title: "Tornado Safety Measures",
        category: "Natural Disasters",
        duration: "8 min read",
        icon: Wind,
        color: "text-zinc-400",
    },
];

export default function LearnPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">Education Hub</h1>
                        <p className="text-zinc-400 max-w-xl">
                            Master the theory of disaster management through expert-curated articles and survival guides.
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full bg-zinc-900/50 border border-white/5 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href="#"
                                className="group flex items-center justify-between p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-white/10 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl bg-black/50 ${article.color}`}>
                                        <article.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            {article.category} • {article.duration}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                                            {article.title}
                                        </h3>
                                    </div>
                                </div>
                                <ChevronRight className="h-6 w-6 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 p-12 rounded-[3.5rem] bg-gradient-to-b from-zinc-900/50 to-transparent border border-white/5 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Universal Survival Safety</h2>
                        <p className="max-w-2xl text-zinc-400 mb-8">
                            Essential tips that apply to almost any emergency situation. Being prepared means knowing the basics.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                            {[
                                { title: "Kit Ready", desc: "Always have a 72-hour emergency kit." },
                                { title: "Plan Set", desc: "Establish a clear communication plan." },
                                { title: "Stay Informed", desc: "Keep a battery-powered radio." },
                            ].map((tip) => (
                                <div key={tip.title} className="p-6 rounded-2xl bg-black/40 border border-white/5">
                                    <h4 className="text-white font-bold mb-2">{tip.title}</h4>
                                    <p className="text-sm text-zinc-500">{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-blue-500/10 blur-[100px]" />
                </div>
            </div>
        </div>
    );
}
