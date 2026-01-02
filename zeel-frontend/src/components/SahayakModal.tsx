"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Bot,
    Send,
    Shield,
    Flame,
    BarChart3,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SahayakModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SahayakModal({ isOpen, onClose }: SahayakModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="bg-white border-b border-border p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                    <Bot className="h-8 w-8" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-black text-primary uppercase tracking-tight">Sahayak - AI Assistant</h2>
                                    <p className="text-sm font-bold text-muted-foreground">Your personal disaster preparedness guide</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                                <X className="h-6 w-6 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-3 rounded-2xl bg-secondary/50 text-primary">
                                    <Bot className="h-10 w-10" />
                                </div>
                                <p className="text-base font-bold text-muted-foreground max-w-xs">
                                    Hello! I&apos;m Sahayak, your personal disaster preparedness assistant. How can I help you stay safe?
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest pl-1">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary text-[8px]">?</span>
                                    Quick Help
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { label: "What to do during earthquake?", icon: Shield, color: "bg-blue-500/10 text-blue-600" },
                                        { label: "How to use SOS?", icon: AlertCircle, color: "bg-pink-500/10 text-pink-600" },
                                        { label: "Fire evacuation steps?", icon: Flame, color: "bg-orange-500/10 text-orange-600" },
                                        { label: "How to improve safety score?", icon: BarChart3, color: "bg-emerald-500/10 text-emerald-600" },
                                    ].map((item, i) => (
                                        <button key={i} className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-border bg-white hover:bg-secondary transition-all text-left group">
                                            <div className={cn("p-1.5 rounded-lg", item.color)}>
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Input */}
                        <div className="p-6 bg-white border-t border-border space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Ask me about disaster safety..."
                                    className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <button className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                    <Send className="h-5 w-5 fill-current" />
                                </button>
                            </div>
                            <p className="text-[10px] text-center font-bold text-muted-foreground uppercase tracking-widest">
                                Demo version - AI responses are simulated
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
