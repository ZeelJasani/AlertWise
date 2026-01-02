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
        <div className="pt-32 pb-24 min-h-screen bg-background transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-extrabold text-foreground mb-4">Emergency Alerts</h1>
                        <p className="text-muted-foreground font-medium">
                            Live updates and critical notifications for your current location.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
                        <MapIcon className="h-4 w-4" />
                        View Interactive Map
                    </button>
                </div>

                <div className="space-y-6">
                    {alerts.map((alert, index) => (
                        <motion.div
                            key={alert.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group rounded-4xl bg-card border border-border p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all"
                        >
                            <div className={`shrink-0 p-5 rounded-3xl ${alert.bg} ${alert.color} shadow-inner`}>
                                <alert.icon className="h-8 w-8" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${alert.bg} ${alert.color}`}>
                                        {alert.type}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-bold">{alert.time}</span>
                                </div>
                                <h3 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">{alert.title}</h3>
                                <p className="text-muted-foreground font-bold mb-4 flex items-center gap-2 text-sm">
                                    <span className="h-2 w-2 rounded-full bg-border" />
                                    {alert.location}
                                </p>
                                <p className="text-muted-foreground font-medium leading-relaxed max-w-3xl border-l-[3px] border-secondary pl-6 py-2">
                                    {alert.desc}
                                </p>
                            </div>

                            <button className="md:self-center p-5 rounded-2xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:bg-background hover:scale-110 transition-all shadow-sm">
                                <ExternalLink className="h-5 w-5" />
                            </button>

                            <div className="absolute top-0 right-0 h-full w-1 bg-linear-to-b from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest bg-secondary inline-block px-4 py-2 rounded-full border border-border">
                        Powered by Global Emergency Response Database • Just now
                    </p>
                </div>
            </div>
        </div>
    );
}
