"use client";

import Link from "next/link";
import { Shield, Globe, LogOut } from "lucide-react";
import { useState } from "react";
import SOSModal from "./SOSModal";

export default function Navbar() {
    const [isSOSOpen, setIsSOSOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background shadow-sm">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Left: Brand */}
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Shield className="h-8 w-8 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold tracking-tight text-primary leading-tight">AlertWise</span>
                                    {/* <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">From Awareness to Action</span> */}
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Auth Links */}
                            <div className="flex items-center gap-4 mr-2">
                                <Link
                                    href="/login"
                                    className="text-sm font-black text-primary uppercase tracking-widest hover:text-primary/70 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-sm font-black text-primary uppercase tracking-widest hover:text-primary/70 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>

                            {/* Language Selector */}
                            {/* <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                                <Globe className="h-5 w-5" />
                                <span>English</span>
                            </button> */}

                            {/* Notifications */}
                            {/* <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white ring-2 ring-background">
                                    3
                                </span>
                            </button> */}

                            {/* SOS Button */}
                            <button
                                onClick={() => setIsSOSOpen(true)}
                                className="flex items-center gap-2 rounded-xl bg-destructive px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-destructive/20 transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="flex items-center justify-center rounded-lg bg-white/20 p-1">
                                    <Shield className="h-4 w-4" />
                                </div>
                                SOS
                            </button>

                            {/* Profile/Logout */}
                            {/* <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                <LogOut className="h-6 w-6" />
                            </button> */}
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
