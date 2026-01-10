"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CreateLearnModulePage() {
    const router = useRouter();
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "natural",
        image: "",
        description: "",
        fullContent: "",
        tips: {
            before: [""] as string[],
            during: [""] as string[],
            after: [""] as string[]
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "title") {
            // Auto-generate slug from title
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            setFormData(prev => ({ ...prev, title: value, slug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTipChange = (section: 'before' | 'during' | 'after', index: number, value: string) => {
        setFormData(prev => {
            const newTips = { ...prev.tips };
            newTips[section] = [...newTips[section]];
            newTips[section][index] = value;
            return { ...prev, tips: newTips };
        });
    };

    const addTip = (section: 'before' | 'during' | 'after') => {
        setFormData(prev => {
            const newTips = { ...prev.tips };
            newTips[section] = [...newTips[section], ""];
            return { ...prev, tips: newTips };
        });
    };

    const removeTip = (section: 'before' | 'during' | 'after', index: number) => {
        setFormData(prev => {
            const newTips = { ...prev.tips };
            newTips[section] = newTips[section].filter((_, i) => i !== index);
            return { ...prev, tips: newTips };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/disasters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Module created successfully!");
                router.push("/admin/learn");
            } else {
                const error = await res.json();
                toast.error(`Failed to create module: ${error.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while creating the module.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/learn"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create Learn Module</h1>
                    <p className="text-muted-foreground">Add a new disaster preparedness guide.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Earthquakes"
                                    required
                                    className="bg-zinc-950 border-zinc-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <Input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="earthquakes"
                                    required
                                    className="bg-zinc-950 border-zinc-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="natural">Natural Disaster</option>
                                    <option value="safety">Universal Safety</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image URL</label>
                                <Input
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    required
                                    className="bg-zinc-950 border-zinc-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Short Description</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Brief summary displayed on the card..."
                                required
                                className="bg-zinc-950 border-zinc-700 min-h-[80px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Content</label>
                            <Textarea
                                name="fullContent"
                                value={formData.fullContent}
                                onChange={handleChange}
                                placeholder="Detailed educational content..."
                                required
                                className="bg-zinc-950 border-zinc-700 min-h-[150px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Safety Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {(['before', 'during', 'after'] as const).map((section) => (
                            <div key={section} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold capitalize">{section}</h3>
                                    <Button type="button" variant="outline" size="sm" onClick={() => addTip(section)} className="border-zinc-700">
                                        <Plus className="h-3 w-3 mr-2" /> Add Tip
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {formData.tips[section].map((tip, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={tip}
                                                onChange={(e) => handleTipChange(section, index, e.target.value)}
                                                placeholder={`Tip for ${section}...`}
                                                className="bg-zinc-950 border-zinc-700"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeTip(section, index)}
                                                className="text-zinc-500 hover:text-red-500"
                                                disabled={formData.tips[section].length === 1}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()} className="border-zinc-700">Cancel</Button>
                    <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {loading ? "Creating..." : <><Save className="mr-2 h-4 w-4" /> Create Module</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
