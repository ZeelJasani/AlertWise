"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface User {
    _id: string;
    clerkId: string;
    firstName?: string;
    lastName?: string;
    email: string;
    imageUrl?: string;
    role: string;
    createdAt: string;
}

interface QuizResult {
    _id: string;
    userId: string;
    quizId: {
        _id: string;
        title: string;
    };
    score: number;
    totalQuestions: number;
    completedAt: string;
}

export default function UserManagementPage() {
    const { getToken } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [quizFilter, setQuizFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();

                // Fetch Users
                const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (usersRes.ok) {
                    setUsers(await usersRes.json());
                }

                // Fetch Quiz Results
                const resultsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quizzes/results/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (resultsRes.ok) {
                    setQuizResults(await resultsRes.json());
                }

            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getToken]);

    // Helper to find user by clerkId
    const getUserDetails = (clerkId: string) => {
        return users.find(u => u.clerkId === clerkId);
    };

    // Filtered Quiz Results
    const filteredResults = quizResults.filter(result => {
        const matchesSearch = getUserDetails(result.userId)?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.quizId?.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesQuiz = quizFilter === "all" || result.quizId?.title === quizFilter;
        return matchesSearch && matchesQuiz;
    });

    // Unique Quiz Titles for Filter
    const uniqueQuizzes = Array.from(new Set(quizResults.map(r => r.quizId?.title).filter(Boolean)));

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage users and track quiz performance.</p>

            <Tabs defaultValue="users" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="users">Registered Users</TabsTrigger>
                    <TabsTrigger value="history">Quiz History</TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle>Registered Users ({users.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-zinc-800 text-zinc-400">
                                            <th className="p-4 font-medium">User Profile</th>
                                            <th className="p-4 font-medium">Email</th>
                                            <th className="p-4 font-medium">Role</th>
                                            <th className="p-4 font-medium">Joined Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800">
                                        {users.map((user) => (
                                            <tr key={user._id} className="hover:bg-zinc-800/50 transition-colors">
                                                <td className="p-4 flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border border-zinc-700">
                                                        <AvatarImage src={user.imageUrl} />
                                                        <AvatarFallback className="bg-zinc-800 text-zinc-300">
                                                            {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium text-white">
                                                            {user.firstName} {user.lastName}
                                                        </div>
                                                        <div className="text-xs text-zinc-500 md:hidden">{user.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-zinc-300 hidden md:table-cell">{user.email}</td>
                                                <td className="p-4">
                                                    <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 text-zinc-500">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <CardTitle>Quiz Attempts ({filteredResults.length})</CardTitle>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input
                                        placeholder="Search user or quiz..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 bg-zinc-950 border-zinc-700 w-[200px]"
                                    />
                                </div>
                                <select
                                    value={quizFilter}
                                    onChange={(e) => setQuizFilter(e.target.value)}
                                    className="bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="all">All Quizzes</option>
                                    {uniqueQuizzes.map(title => (
                                        <option key={title} value={title}>{title}</option>
                                    ))}
                                </select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-zinc-800 text-zinc-400">
                                            <th className="p-4 font-medium">User</th>
                                            <th className="p-4 font-medium">Quiz Title</th>
                                            <th className="p-4 font-medium">Score</th>
                                            <th className="p-4 font-medium">Percentage</th>
                                            <th className="p-4 font-medium">Date Taken</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800">
                                        {filteredResults.length > 0 ? (
                                            filteredResults.map((result) => {
                                                const user = getUserDetails(result.userId);
                                                const percentage = Math.round((result.score / result.totalQuestions) * 100);

                                                return (
                                                    <tr key={result._id} className="hover:bg-zinc-800/50 transition-colors">
                                                        <td className="p-4 flex items-center gap-3">
                                                            {user ? (
                                                                <>
                                                                    <Avatar className="h-8 w-8 border border-zinc-700">
                                                                        <AvatarImage src={user.imageUrl} />
                                                                        <AvatarFallback className="bg-zinc-800 text-zinc-300">
                                                                            {user.firstName?.charAt(0)}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="font-medium text-white">
                                                                        {user.firstName} {user.lastName}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <span className="text-zinc-500 italic">Unknown User ({result.userId})</span>
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-zinc-300 font-medium">{result.quizId?.title || "Deleted Quiz"}</td>
                                                        <td className="p-4 text-zinc-300">{result.score} / {result.totalQuestions}</td>
                                                        <td className="p-4">
                                                            <Badge variant={percentage >= 70 ? "default" : "destructive"}>
                                                                {percentage}%
                                                            </Badge>
                                                        </td>
                                                        <td className="p-4 text-zinc-500">
                                                            {new Date(result.completedAt).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-zinc-500">
                                                    No quiz attempts found matching your filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
