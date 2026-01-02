"use client";

import { motion } from "framer-motion";
import { BookOpen, Trophy, Bell, HeartPulse, ShieldAlert, Map } from "lucide-react";
import Link from "next/link";

const features = [
    {
        title: "Learn & Prepare",
        description: "Access comprehensive disaster theory, survival articles, and step-by-step readiness guides.",
        icon: BookOpen,
        href: "/learn",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Test Your Knowledge",
        description: "Take interactive quizzes to measure your preparedness and earn certification badges.",
        icon: Trophy,
        href: "/quiz",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "Live Emergency Alerts",
        description: "Stay informed with real-time notifications about disasters occurring in your vicinity.",
        icon: Bell,
        href: "/alerts",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        title: "Instant SOS",
        description: "One-tap emergency trigger that detects your location and alerts local services instantly.",
        icon: HeartPulse,
        href: "/sos",
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
    {
        title: "Disaster Response",
        description: "Find nearest shelters, fire stations, and medical facilities with our real-time map.",
        icon: Map,
        href: "/dashboard",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Expert Safety Tips",
        description: "Get disaster-specific advice compiled from global emergency management experts.",
        icon: ShieldAlert,
        href: "/learn",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-24 bg-black relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={feature.href}
                                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-8 transition-all hover:bg-zinc-900 hover:border-white/10"
                            >
                                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} transition-transform group-hover:scale-110`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>

                                {/* Decorative Glow */}
                                <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-blue-600/5 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
