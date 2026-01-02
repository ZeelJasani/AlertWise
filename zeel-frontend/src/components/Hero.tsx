"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-white pt-32 pb-24 sm:pt-48 sm:pb-32 font-sans transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <span className="inline-flex items-center rounded-full bg-primary/5 px-4 py-1.5 text-xs font-black text-primary border border-primary/10 uppercase tracking-widest shadow-sm">
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            Official Disaster Response Platform
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl font-black tracking-tighter text-primary sm:text-7xl lg:text-8xl leading-[0.9]"
                    >
                        Protecting <br />
                        <span className="text-primary/40">Lives. Together.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto font-bold"
                    >
                        Master disaster preparedness with DisasterEdu. Comprehensive safety training, interactive simulations, and real-time response tools for every citizen.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-5 text-base font-black text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 uppercase tracking-widest">
                            Get Started
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-white px-10 py-5 text-base font-black text-primary hover:bg-secondary transition-all active:scale-95 uppercase tracking-widest">
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Simple Subtle Grid pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.2]"></div>
        </div>
    );
}
