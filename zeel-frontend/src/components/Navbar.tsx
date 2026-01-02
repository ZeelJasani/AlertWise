"use client";

import Link from "next/link";
import { Shield, Globe } from "lucide-react";
import { useState } from "react";
import SOSModal from "./SOSModal";

export default function Navbar() {
    const [isSOSOpen, setIsSOSOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background shadow-sm">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Left Side: Brand & Main Nav */}
                        <div className="flex items-center gap-10">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Shield className="h-8 w-8 text-primary" />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-primary leading-tight">AlertWise</span>
                            </Link>

                            <div className="hidden md:flex items-center gap-8">
                                <Link
                                    href="/dashboard"
                                    className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] hover:text-primary transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/learn"
                                    className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] hover:text-primary transition-colors"
                                >
                                    Learn
                                </Link>
                                <Link
                                    href="/admin"
                                    className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] hover:text-primary transition-colors"
                                >
                                    Admin
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Auth & SOS */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 mr-2">
                                <Link
                                    href="/login"
                                    className="text-xs font-black text-primary uppercase tracking-[0.2em] hover:text-primary/70 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-xs font-black text-primary uppercase tracking-[0.2em] hover:text-primary/70 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>

                            <button
                                onClick={() => setIsSOSOpen(true)}
                                className="flex items-center gap-2 rounded-xl bg-destructive px-6 py-2.5 text-xs font-black text-white shadow-lg shadow-destructive/20 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
                            >
                                <div className="flex items-center justify-center rounded-lg bg-white/20 p-1">
                                    <Shield className="h-4 w-4" />
                                </div>
                                SOS
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <SOSModal
                isOpen={isSOSOpen}
                onClose={() => setIsSOSOpen(false)}
                onConfirm={() => {
                    alert("SOS Alert Sent!");
                    setIsSOSOpen(false);
                }}
            />
        </>
    );
}
