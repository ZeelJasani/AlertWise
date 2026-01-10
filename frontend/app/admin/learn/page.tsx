"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Plus, BookOpen, MoreVertical, Pencil, Trash2 } from "lucide-react";

interface Disaster {
    _id: string;
    title: string;
    slug: string;
    category: string;
    image: string;
    description: string;
}

export default function LearnManagementPage() {
    const { userId } = useAuth();
    const [modules, setModules] = useState<Disaster[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/disasters`);
            if (res.ok) {
                const data = await res.json();
                setModules(data);
            }
        } catch (error) {
            console.error("Failed to fetch learn modules", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Learn Modules</h1>
                    <p className="text-muted-foreground">Manage disaster preparedness content.</p>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/admin/learn/create">
                        <Plus className="mr-2 h-4 w-4" /> Create Module
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module) => (
                    <Card key={module._id} className="group overflow-hidden border-muted/60 hover:border-primary/50 transition-colors duration-300 flex flex-col p-4 bg-zinc-900/50 h-full">
                        <div className="relative h-60 w-full overflow-hidden rounded-xl">
                            {module.image ? (
                                <Image
                                    src={module.image}
                                    alt={module.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-zinc-700 bg-zinc-950">
                                    <BookOpen size={48} strokeWidth={1} />
                                </div>
                            )}
                            <div className="absolute top-3 right-3 bg-zinc-950/90 text-zinc-100 px-2.5 py-0.5 rounded-md text-xs font-medium border border-zinc-700/50 shadow-sm backdrop-blur-sm">
                                {module.category}
                            </div>
                        </div>

                        <CardHeader className="p-0 pt-5">
                            <CardTitle className="text-2xl font-bold line-clamp-1" title={module.title}>
                                {module.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-0 pt-3 grow">
                            <p className="text-base text-muted-foreground line-clamp-3 leading-relaxed">
                                {module.description}
                            </p>
                        </CardContent>

                        <div className="p-0 pt-6 mt-auto flex gap-3">
                            <Button variant="outline" className="flex-1 border-muted/60 hover:bg-zinc-800 hover:text-white group/edit" asChild>
                                <Link href={`/admin/learn/edit/${module._id}`}>
                                    <Pencil className="mr-2 h-4 w-4 text-zinc-400 group-hover/edit:text-white transition-colors" /> Edit
                                </Link>
                            </Button>
                            <Button variant="destructive" size="icon" className="shrink-0 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}

                {modules.length === 0 && !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/50">
                        <BookOpen className="h-10 w-10 text-zinc-500 mb-4" />
                        <h3 className="text-lg font-medium text-white">No modules found</h3>
                        <p className="text-zinc-500 max-w-sm mt-2 mb-6">Get started by creating your first disaster preparedness guide.</p>
                        <Button variant="outline" className="border-zinc-700" asChild>
                            <Link href="/admin/learn/create">Create Module</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
