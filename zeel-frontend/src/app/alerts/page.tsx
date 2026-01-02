"use client";

import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, Map as MapIcon, ExternalLink } from "lucide-react";

const alerts = [
    {
        type: "Critical",
        title: "Flash Flood Warning",
        location: "Downtown / River Basin",
        time: "2 mins ago",
        desc: "Heavy rainfall has caused water levels to rise rapidly. Evacuate low-lying areas immediately.",
        icon: AlertTriangle,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
    {
        type: "Warning",
        title: "Severe Thunderstorm",
        location: "Northern Suburbs",
        time: "15 mins ago",
        desc: "High winds and lightning expected. Secure outdoor objects and seek shelter.",
        icon: AlertCircle,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        type: "Info",
        title: "Power Grid Maintenance",
        location: "Sector 4-B",
        time: "1 hour ago",
        desc: "Scheduled maintenance in progress. Expect minor outages until 4:00 PM.",
        icon: Info,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
];

export default function AlertsPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">Emergency Alerts</h1>
                        <p className="text-zinc-400">
                            Live updates and critical notifications for your current location.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all">
                        <MapIcon className="h-4 w-4" />
                        View Interactive Map
                    </button>
                </div>

                <div className="space-y-6">
                    {alerts.map((alert, index) => (
                        <motion.div
                            key={alert.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group rounded-[2rem] bg-zinc-900/30 border border-white/5 p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                        >
                            <div className={`shrink-0 p-4 rounded-2xl ${alert.bg} ${alert.color}`}>
                                <alert.icon className="h-8 w-8" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${alert.bg} ${alert.color}`}>
                                        {alert.type}
                                    </span>
                                    <span className="text-xs text-zinc-500 font-medium">{alert.time}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{alert.title}</h3>
                                <p className="text-zinc-500 font-medium mb-4 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                                    {alert.location}
                                </p>
                                <p className="text-zinc-400 leading-relaxed max-w-3xl border-l border-white/10 pl-4 py-1">
                                    {alert.desc}
                                </p>
                            </div>

                            <button className="md:self-center p-4 rounded-full bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                                <ExternalLink className="h-5 w-5" />
                            </button>

                            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-zinc-600">
                        Powered by Global Emergency Response Database. Last synced: Just now.
                    </p>
                </div>
            </div>
        </div>
    );
}
