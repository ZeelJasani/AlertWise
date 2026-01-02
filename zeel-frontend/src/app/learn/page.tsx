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
        slug: "earthquake-safety",
    },
    {
        title: "Flood Preparedness 101",
        category: "Safety",
        duration: "15 min read",
        icon: Waves,
        color: "text-blue-500",
        slug: "flood-safety",
    },
    {
        title: "Wildfire Response Protocol",
        category: "Emergency",
        duration: "12 min read",
        icon: Flame,
        color: "text-orange-500",
        slug: "wildfire-safety",
    },
    {
        title: "Tornado Safety Measures",
        category: "Natural Disasters",
        duration: "8 min read",
        icon: Wind,
        color: "text-zinc-400",
        slug: "tornado-safety",
    },
];

export default function LearnPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-background transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-extrabold text-foreground mb-4">Education Hub</h1>
                        <p className="text-muted-foreground max-w-xl font-medium">
                            Master the theory of disaster management through expert-curated articles and survival guides.
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full bg-card border border-border rounded-full py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
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
                                href={`/learn/${article.slug}`}
                                className="group flex items-center justify-between p-6 rounded-3xl bg-card border border-border hover:bg-secondary/50 hover:border-primary/30 transition-all shadow-sm hover:shadow-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl bg-secondary shadow-sm ${article.color}`}>
                                        <article.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                            {article.category} • {article.duration}
                                        </span>
                                        <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>
                                    </div>
                                </div>
                                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 p-12 rounded-[3.5rem] bg-secondary/80 border border-border relative overflow-hidden shadow-xl">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <h2 className="text-3xl font-extrabold text-foreground mb-6">Universal Survival Safety</h2>
                        <p className="max-w-2xl text-muted-foreground mb-8 font-medium">
                            Essential tips that apply to almost any emergency situation. Being prepared means knowing the basics.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                            {[
                                { title: "Kit Ready", desc: "Always have a 72-hour emergency kit." },
                                { title: "Plan Set", desc: "Establish a clear communication plan." },
                                { title: "Stay Informed", desc: "Keep a battery-powered radio." },
                            ].map((tip) => (
                                <div key={tip.title} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                    <h4 className="text-foreground font-bold mb-2">{tip.title}</h4>
                                    <p className="text-sm text-muted-foreground font-medium">{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-primary/5 blur-[100px]" />
                </div>
            </div>
        </div>
    );
}
