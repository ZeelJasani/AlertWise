"use client";

import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShieldAlert, MapPin, Send, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SOSRequest {
    _id: string;
    message: string;
    location: string;
    status: 'pending' | 'approved' | 'rejected';
    adminResponse?: string;
    createdAt: string;
}

export default function SOSPage() {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [history, setHistory] = useState<SOSRequest[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    const fetchHistory = React.useCallback(async () => {
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/sos/my-history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setHistory(data);
            }
        } catch (error) {
            console.error("Error fetching history", error);
        } finally {
            setHistoryLoading(false);
        }
    }, [getToken, setHistory, setHistoryLoading]);

    useEffect(() => {
        if (user) {
            fetchHistory();
        }
    }, [user, fetchHistory]);

    const handleAutoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
            }, () => {
                alert("Could not get location. Please enter manually.");
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location || !message) return;

        setSubmitting(true);
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/sos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ location, message })
            });

            if (res.ok) {
                const newRequest = await res.json();
                setHistory([newRequest, ...history]);
                setMessage("");
                // keep location for convenience
                alert("SOS Request Sent! Help is on the way.");
            }
        } catch (error) {
            console.error("Error sending SOS", error);
            alert("Failed to send request. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container max-w-4xl mx-auto px-6 py-24 space-y-12">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/10 text-red-500 mb-4 animate-pulse">
                    <ShieldAlert className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
                    Emergency SOS
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Request immediate assistance. Your location and details will be sent to our emergency response team.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* SOS Form */}
                <Card className="bg-card dark:bg-card border-border backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Request Help</CardTitle>
                        <CardDescription>Fill out the form below to send an alert.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Your Location</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g., 123 Main St, Springfield"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                        className="bg-card border-border"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={handleAutoLocation}
                                        title="Use Current Location"
                                        className="border-border bg-muted/50"
                                    >
                                        <MapPin className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Emergency Details</label>
                                <Textarea
                                    placeholder="Describe your situation..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="bg-card border-border min-h-[120px]"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg shadow-lg shadow-red-600/20"
                                disabled={submitting}
                            >
                                {submitting ? "Sending..." : (
                                    <>
                                        SEND SOS ALERT <Send className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* History Section */}
                <Card className="bg-card/50 border-border">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <History className="h-5 w-5 text-zinc-400" /> Request History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {historyLoading ? (
                                <p className="text-zinc-500 text-sm">Loading history...</p>
                            ) : history.length === 0 ? (
                                <p className="text-zinc-500 text-sm text-center py-8">No previous requests.</p>
                            ) : (
                                history.map((req) => (
                                    <div key={req._id} className="p-4 rounded-lg bg-card/30 border border-border space-y-2">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className={`
                                                ${req.status === 'approved' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : ''}
                                                ${req.status === 'rejected' ? 'text-red-400 border-red-400/30 bg-red-400/10' : ''}
                                                ${req.status === 'pending' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' : ''}
                                            `}>
                                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                            </Badge>
                                            <span className="text-xs text-zinc-600">{new Date(req.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-zinc-300 text-sm">&quot;{req.message}&quot;</p>
                                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                                            <MapPin className="h-3 w-3" /> {req.location}
                                        </div>
                                        {req.adminResponse && (
                                            <div className="mt-2 p-2 rounded bg-zinc-900 border border-zinc-800 text-xs">
                                                <span className="font-semibold text-primary">Admin Response:</span>
                                                <p className="text-zinc-400 mt-1">{req.adminResponse}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
