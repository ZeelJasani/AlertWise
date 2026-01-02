"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-black pt-32 pb-24 sm:pt-48 sm:pb-32">
            {/* Background Glow */}
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <span className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-zinc-400 border border-white/5">
                            <span className="flex h-2 w-2 mr-2 rounded-full bg-blue-500 animate-pulse" />
                            Emergency Preparedness Platform
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
                    >
                        Stay Ahead of the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                            Unexpected.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto"
                    >
                        The world&apos;s most advanced disaster readiness platform. Real-time alerts, AI-driven survival guides, and instant emergency response.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 flex items-center justify-center gap-x-6"
                    >
                        <button className="group relative flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Get Started
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/20">
                            <Play className="h-5 w-5 fill-current" />
                            Watch Demo
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
    );
}
