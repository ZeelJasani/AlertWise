"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle, MessageSquare } from "lucide-react";

interface SOSRequest {
    _id: string;
    userName: string;
    userEmail: string;
    location: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    adminResponse?: string;
    createdAt: string;
}

export default function SOManagementPage() {
    const { getToken } = useAuth();
    const [requests, setRequests] = useState<SOSRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<SOSRequest | null>(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/sos/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (error) {
            console.error("Failed to fetch SOS requests", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (status: 'approved' | 'rejected') => {
        if (!selectedRequest) return;
        setActionLoading(true);

        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/sos/${selectedRequest._id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    status,
                    adminResponse: replyMessage
                })
            });

            if (res.ok) {
                // Update local state
                setRequests(prev => prev.map(req =>
                    req._id === selectedRequest._id
                        ? { ...req, status, adminResponse: replyMessage }
                        : req
                ));
                setIsDialogOpen(false);
                setReplyMessage("");
                setSelectedRequest(null);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setActionLoading(false);
        }
    };

    const openActionDialog = (req: SOSRequest) => {
        setSelectedRequest(req);
        setReplyMessage(req.adminResponse || "");
        setIsDialogOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25";
            case 'rejected': return "bg-red-500/15 text-red-500 hover:bg-red-500/25";
            default: return "bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25";
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">SOS Requests Management</h1>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle>Recent Emergency Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800 text-zinc-400">
                                    <th className="p-4 font-medium">User</th>
                                    <th className="p-4 font-medium">Location</th>
                                    <th className="p-4 font-medium">Message</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium text-white">{req.userName}</div>
                                            <div className="text-xs text-zinc-500">{req.userEmail}</div>
                                        </td>
                                        <td className="p-4 text-zinc-300">{req.location}</td>
                                        <td className="p-4 text-zinc-300 max-w-xs truncate" title={req.message}>
                                            {req.message}
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="secondary" className={getStatusColor(req.status)}>
                                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-zinc-500">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openActionDialog(req)}
                                                className="border-zinc-700 hover:bg-zinc-800 hover:text-white"
                                            >
                                                Manage
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Handle SOS Request</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Updates are sent immediately to the user.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRequest && (
                        <div className="space-y-4 py-4">
                            <div className="p-3 bg-zinc-900 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between items-center text-zinc-400">
                                    <span>From: {selectedRequest.userName}</span>
                                    <span>{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="p-2 bg-black/40 rounded border border-zinc-800 text-zinc-200">
                                    "{selectedRequest.message}"
                                </div>
                                <div className="text-xs text-zinc-500 flex items-center gap-1">
                                    📍 {selectedRequest.location}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Admin Response</label>
                                <Textarea
                                    placeholder="Enter custom message to user..."
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 min-h-[100px]"
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 sm:justify-between">
                        <div className="flex gap-2 w-full">
                            <Button
                                variant="destructive"
                                className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
                                onClick={() => handleAction('rejected')}
                                disabled={actionLoading}
                            >
                                <XCircle className="mr-2 h-4 w-4" /> Reject
                            </Button>
                            <Button
                                className="flex-1 bg-emerald-500 text-white hover:bg-emerald-600"
                                onClick={() => handleAction('approved')}
                                disabled={actionLoading}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
