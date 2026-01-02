"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    AlertTriangle,
    MapPin,
} from "lucide-react";

interface SOSModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SOSModal({ isOpen, onClose, onConfirm }: SOSModalProps) {
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
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 pb-4 flex flex-col items-center text-center">
                            <div className="mb-6 h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive animate-pulse">
                                <AlertTriangle className="h-10 w-10" />
                            </div>
                            <h2 className="text-2xl font-black text-destructive uppercase tracking-tight">Confirm Emergency Alert</h2>
                            <p className="mt-4 text-base font-bold text-muted-foreground leading-relaxed">
                                You are about to send an emergency SOS alert. This will immediately notify:
                            </p>
                        </div>

                        {/* List of Notified Parties */}
                        <div className="px-8 pb-8">
                            <ul className="space-y-2 text-sm font-bold text-muted-foreground list-disc pl-5">
                                <li>School administrators</li>
                                <li>Emergency response team</li>
                                <li>Local authorities</li>
                            </ul>

                            {/* Location Mock */}
                            <div className="mt-8 flex items-center gap-3 p-4 bg-secondary rounded-xl border border-border">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Location</span>
                                    <span className="text-sm font-bold text-primary">School Campus, Block A</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 pt-0 flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 border border-border rounded-xl text-sm font-black text-primary uppercase tracking-widest bg-white hover:bg-secondary transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 py-4 bg-destructive text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-destructive/20 hover:bg-destructive/90 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Send SOS Alert
                            </button>
                        </div>

                        {/* Close Icon (Extra) */}
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg transition-colors">
                            <X className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
