"use client";

import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Learn", href: "/learn" },
    { name: "Quiz", href: "/quiz" },
    { name: "Alerts", href: "/alerts" },
    { name: "SOS", href: "/sos" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Shield className="h-6 w-6 text-blue-500 transition-transform group-hover:scale-110" />
                            <span className="text-xl font-bold tracking-tight text-white">AlertWise</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:block">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
                                Join Now
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-zinc-400 hover:text-white"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div
                className={cn(
                    "fixed inset-x-0 top-16 z-40 bg-black border-b border-white/10 transition-all duration-300 md:hidden",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                )}
            >
                <div className="flex flex-col gap-4 p-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-zinc-400 hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="mt-2 w-full rounded-xl bg-white p-3 font-semibold text-black">
                        Join Now
                    </button>
                </div>
            </div>
        </nav>
    );
}
