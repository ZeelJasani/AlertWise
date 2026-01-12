"use client";

import { Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicAlertsPage() {
    return (
        <div className="container max-w-4xl mx-auto px-6 py-24 min-h-[80vh] flex flex-col items-center justify-center space-y-12">
            {/* Back Button */}
            <div className="absolute top-24 left-6 md:left-12 lg:left-24">
                <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary transition-colors group" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="inline-flex items-center justify-center p-8 rounded-full bg-primary/5 text-primary mb-4 ring-1 ring-primary/20">
                    <Bell className="h-16 w-16 animate-pulse" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-foreground">
                        Real Time Alerts
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're building a state of the art emergency broadcast system to keep you informed when it matters most.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-6 py-2 text-sm font-semibold text-primary uppercase tracking-widest">
                        Coming Soon
                    </div>
                    <p className="text-sm text-muted-foreground/60 italic font-mono">
                        Stay Tuned. Stay Safe.
                    </p>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            </div>
        </div>
    );
}
