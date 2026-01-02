"use client";

import { AlertTriangle, Users, TrendingUp, Calendar } from "lucide-react";

export default function Overview() {
    const stats = [
        { label: "Total Students", value: "245", trend: "+12 from last month", icon: Users },
        { label: "Average Safety Score", value: "81", trend: "+5% from last week", icon: TrendingUp },
        { label: "Drills This Month", value: "8", trend: "2 scheduled", icon: Calendar },
        { label: "Active SOS Alerts", value: "1", trend: "Requires attention", icon: AlertTriangle, critical: true },
    ];

    const alerts = [
        { name: "Alex Johnson", location: "Block A, Room 101", time: "2 minutes ago", status: "Active" },
        { name: "Sarah Wilson", location: "Library, 2nd Floor", time: "1 hour ago", status: "Resolved" },
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                            <stat.icon className={`h-5 w-5 ${stat.critical ? 'text-rose-500' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-4xl font-black ${stat.critical ? 'text-rose-600' : 'text-slate-900'}`}>{stat.value}</span>
                            <span className="text-xs font-medium text-slate-400 mt-2">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* SOS Alerts Section */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-8 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-rose-500" />
                        SOS Alerts
                    </h2>
                </div>
                <div className="px-8 pb-8 space-y-4">
                    {alerts.map((alert, i) => (
                        <div key={i} className="group p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 h-3 w-3 rounded-full ${alert.status === 'Active' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`} />
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{alert.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium mt-1">📍 {alert.location}</p>
                                    <p className="text-xs text-slate-400 font-medium mt-1">{alert.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {alert.status === 'Active' && (
                                    <button className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-200 transition-all">
                                        Respond
                                    </button>
                                )}
                                <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold transition-all">
                                    False Alarm
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
