"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditLearnModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

    useEffect(() => {
        fetchModule();
    }, [id]);

    const fetchModule = async () => {
        try {
            // Note: Currently fetching by ID might require a specific endpoint or we find it from the list if ID endpoint not available
            // Assuming for now generic GET /api/disasters will return all and we find one, OR we implement GET /api/disasters/:id
            // Since the current route is GET /api/disasters/:slug, we might have a conflict if we try to pass an ID to it unless the backend handles both.
            // Let's check the backend controller.

            // Temporary strategy validation: 
            // If the backend only supports getBySlug, we might have issues fetching by ID.
            // However, usually admin routes need ID. 
            // I'll wait to see the controller content before deciding the fetch URL.
            // But I will write this file assuming I can fetch by ID or I will fix the backend.

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/disasters`);
            if (res.ok) {
                const data = await res.json();
                const module = data.find((d: any) => d._id === id);
                if (module) {
                    setFormData({
                        title: module.title,
                        slug: module.slug,
                        category: module.category,
                        image: module.image,
                        description: module.description,
                        fullContent: module.fullContent,
                        tips: module.tips || { before: [], during: [], after: [] }
                    });
                } else {
                    toast.error("Module not found");
                    router.push("/admin/learn");
                }
            }
        } catch (error) {
            console.error("Failed to fetch module", error);
            toast.error("Failed to load module data");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "title") {
            // Optional: Don't auto-update slug on edit unless user explicitly changes it? 
            // Usually on edit we keep slug stable unless manually changed to avoid breaking SEO links.
            setFormData(prev => ({ ...prev, [name]: value }));
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
        setSaving(true);

        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/disasters/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Module updated successfully!");
                router.push("/admin/learn");
            } else {
                const error = await res.json();
                toast.error(`Failed to update module: ${error.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the module.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/learn"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Learn Module</h1>
                    <p className="text-muted-foreground">Update content for {formData.title}</p>
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
                                    className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
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
                                                className="bg-zinc-950 border-zinc-700"
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeTip(section, index)} className="text-zinc-500 hover:text-red-500">
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
                    <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {saving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
