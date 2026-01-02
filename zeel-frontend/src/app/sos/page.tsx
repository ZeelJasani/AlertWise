"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, MapPin, Phone, Radio, Siren } from "lucide-react";

export default function SOSPage() {
    const [isActivating, setIsActivating] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, searching, connecting, sent

    const triggerSOS = () => {
        setIsActivating(true);
        setStatus("searching");

        setTimeout(() => setStatus("connecting"), 2000);
        setTimeout(() => setStatus("sent"), 4500);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background Pulse Effect */}
            {status !== "idle" && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-rose-600"
                    />
                </div>
            )}

            <div className="mx-auto max-w-xl px-4 w-full text-center relative z-10">
                <AnimatePresence mode="wait">
                    {status === "idle" ? (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <div className="mb-12">
                                <div className="inline-flex p-4 rounded-3xl bg-rose-500/10 text-rose-500 mb-6">
                                    <ShieldAlert className="h-10 w-10" />
                                </div>
                                <h1 className="text-4xl font-extrabold text-white mb-4">SOS Emergency</h1>
                                <p className="text-zinc-500">
                                    Press and hold the button below to alert emergency services and share your current location.
                                </p>
                            </div>

                            <div className="relative flex justify-center">
                                <button
                                    onMouseDown={triggerSOS}
                                    className="group relative h-48 w-48 rounded-full bg-rose-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(225,29,72,0.4)]"
                                >
                                    <span className="text-3xl font-black text-white italic">SOS</span>
                                    {/* Outer Rings */}
                                    <div className="absolute inset-0 rounded-full border-4 border-rose-600/50 animate-ping" />
                                    <div className="absolute inset-[-20px] rounded-full border border-rose-600/20" />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-12 backdrop-blur-xl"
                        >
                            <div className="mb-10 flex justify-center">
                                {status === "sent" ? (
                                    <div className="h-24 w-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                        <ShieldAlert className="h-12 w-12 text-white" />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="h-24 w-24 rounded-full border-4 border-rose-600 border-t-transparent animate-spin" />
                                        <Siren className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-rose-600" />
                                    </div>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-4">
                                {status === "searching" && "Detecting Location..."}
                                {status === "connecting" && "Connecting to local services..."}
                                {status === "sent" && "Emergency Alert Sent!"}
                            </h2>

                            <div className="space-y-6 mt-10">
                                <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-colors ${status === "searching" ? "bg-white/5 border-white/10" : "bg-emerald-500/10 border-emerald-500/20"}`}>
                                    <MapPin className={`h-5 w-5 ${status === "searching" ? "text-zinc-500" : "text-emerald-500"}`} />
                                    <div className="text-left">
                                        <p className="text-xs text-zinc-500 uppercase font-bold">Coordinates</p>
                                        <p className="text-white font-mono">
                                            {status === "searching" ? "Fetching..." : "40.7128° N, 74.0060° W"}
                                        </p>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-colors ${status !== "sent" ? "bg-white/5 border-white/10" : "bg-emerald-500/10 border-emerald-500/20"}`}>
                                    <Phone className={`h-5 w-5 ${status !== "sent" ? "text-zinc-500" : "text-emerald-500"}`} />
                                    <div className="text-left">
                                        <p className="text-xs text-zinc-500 uppercase font-bold">Response Center</p>
                                        <p className="text-white">
                                            {status !== "sent" ? "Identifying..." : "Nearest Station: Sector 7"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {status === "sent" && (
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-10 w-full rounded-2xl bg-white p-5 font-bold text-black hover:bg-zinc-200 transition-all"
                                >
                                    Cancel / Return Home
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        </div>
    );
}
