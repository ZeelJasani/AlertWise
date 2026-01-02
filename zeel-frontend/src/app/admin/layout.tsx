"use client";

import { Bell, Globe, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
            {/* Admin Header */}
            <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-primary leading-tight">DisasterEdu</h1>
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">From Awareness to Action</p>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors cursor-pointer group">
                        <Globe className="h-5 w-5" />
                        <span className="text-sm font-semibold">English</span>
                    </div>

                    <div className="relative">
                        <div className="p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer relative">
                            <Bell className="h-6 w-6 text-slate-600" />
                            <span className="absolute top-1 right-1 h-5 w-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">2</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800">Mr. Suresh Kumar</p>
                            <p className="text-xs font-medium text-slate-500">Teacher/Admin</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                            <User className="h-6 w-6 text-slate-400" />
                        </div>
                        <button className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors">
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto p-8">
                {children}
            </main>

            {/* Floating Chat Button (Bottom Right) */}
            <button className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-[#003366] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5181 20 9.12349 19.6601 7.90141 19.0645L3 20L4.17415 15.6841C3.42468 14.478 3 13.0416 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}
