"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, MapPin, Phone, Siren } from "lucide-react";

export default function SOSPage() {
    const [status, setStatus] = useState("idle"); // idle, searching, connecting, sent

    const triggerSOS = () => {
        setStatus("searching");

        setTimeout(() => setStatus("connecting"), 2000);
        setTimeout(() => setStatus("sent"), 4500);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center relative overflow-hidden transition-colors duration-500">
            {/* Background Pulse Effect */}
            {status !== "idle" && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.05, 0] }}
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
                                <div className="inline-flex p-5 rounded-4xl bg-rose-500/10 text-rose-500 mb-8 shadow-inner">
                                    <ShieldAlert className="h-12 w-12" />
                                </div>
                                <h1 className="text-5xl font-black text-foreground mb-6 tracking-tight">SOS Emergency</h1>
                                <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto">
                                    Press and hold the button below to alert emergency services and share your current location.
                                </p>
                            </div>

                            <div className="relative flex justify-center">
                                <button
                                    onMouseDown={triggerSOS}
                                    className="group relative h-56 w-56 rounded-full bg-rose-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(225,29,72,0.3)] hover:shadow-rose-500/50"
                                >
                                    <span className="text-4xl font-black text-white italic tracking-tighter">SOS</span>
                                    {/* Outer Rings */}
                                    <div className="absolute inset-0 rounded-full border-8 border-rose-600/30 animate-ping" />
                                    <div className="absolute inset-[-30px] rounded-full border border-rose-600/10" />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card border border-border rounded-[3.5rem] p-12 backdrop-blur-3xl shadow-2xl shadow-rose-500/5"
                        >
                            <div className="mb-10 flex justify-center">
                                {status === "sent" ? (
                                    <div className="h-28 w-28 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                                        <ShieldAlert className="h-14 w-14 text-white" />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="h-28 w-28 rounded-full border-[6px] border-rose-600 border-t-transparent animate-spin" />
                                        <Siren className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-rose-600" />
                                    </div>
                                )}
                            </div>

                            <h2 className="text-3xl font-black text-foreground mb-4">
                                {status === "searching" && "Detecting Location..."}
                                {status === "connecting" && "Connecting..."}
                                {status === "sent" && "Alert Sent Successfully"}
                            </h2>

                            <div className="space-y-6 mt-10">
                                <div className={`p-5 rounded-2xl border flex items-center gap-4 transition-colors ${status === "searching" ? "bg-secondary/50 border-border" : "bg-emerald-500/5 border-emerald-500/20"}`}>
                                    <MapPin className={`h-6 w-6 ${status === "searching" ? "text-muted-foreground" : "text-emerald-500"}`} />
                                    <div className="text-left">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Coordinates</p>
                                        <p className="text-foreground font-mono font-bold">
                                            {status === "searching" ? "Fetching..." : "40.7128° N, 74.0060° W"}
                                        </p>
                                    </div>
                                </div>

                                <div className={`p-5 rounded-2xl border flex items-center gap-4 transition-colors ${status !== "sent" ? "bg-secondary/50 border-border" : "bg-emerald-500/5 border-emerald-500/20"}`}>
                                    <Phone className={`h-6 w-6 ${status !== "sent" ? "text-muted-foreground" : "text-emerald-500"}`} />
                                    <div className="text-left">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Response Center</p>
                                        <p className="text-foreground font-bold">
                                            {status !== "sent" ? "Identifying..." : "Nearest Station: Sector 7"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {status === "sent" && (
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-12 w-full rounded-2xl bg-foreground py-5 font-black text-background hover:scale-[1.02] active:scale-98 transition-all shadow-xl shadow-foreground/10"
                                >
                                    Cancel / Return Home
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none" />
        </div>
    );
}
