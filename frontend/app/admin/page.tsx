"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, ShieldAlert, BookOpen, Activity, BrainCircuit } from "lucide-react";

interface RecentActivity {
    type: string;
    message: string;
    time: string;
}

interface AdminStats {
    totalUsers: number;
    activeSOS: number;
    totalModules: number;
    totalQuizzes: number;
    recentActivity: RecentActivity[];
}

export default function AdminDashboard() {
    const { getToken } = useAuth();
    const [stats, setStats] = useState<AdminStats>({
        totalUsers: 0,
        activeSOS: 0,
        totalModules: 0,
        totalQuizzes: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = await getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [getToken]);

    const statCards = [
        { title: "Total Users", value: stats.totalUsers, icon: Users, description: "Registered users", color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Active SOS", value: stats.activeSOS, icon: ShieldAlert, description: "Pending requests", color: "text-red-500", bg: "bg-red-500/10" },
        { title: "Learn Modules", value: stats.totalModules, icon: BookOpen, description: "Active modules", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { title: "Quiz Modules", value: stats.totalQuizzes, icon: BrainCircuit, description: "Active quizzes", color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    if (loading) return <div className="p-8 text-zinc-400">Loading dashboard stats...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">Welcome back to the admin control panel.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <p className="text-xs text-zinc-500 mt-1">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                        <Activity className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">{activity.message}</p>
                                        <p className="text-xs text-zinc-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-center text-sm text-zinc-400">
                            Select a module from the sidebar to manage content.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
