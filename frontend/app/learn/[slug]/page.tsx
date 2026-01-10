import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, ShieldAlert, CheckCircle2, AlertTriangle, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Disaster } from "@/types";

// Force dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic';

async function getDisaster(slug: string): Promise<Disaster | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/disasters/${slug}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching disaster:", error);
        return null;
    }
}

export default async function DisasterPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const disaster = await getDisaster(slug);

    if (!disaster) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-4 space-y-12 max-w-5xl">
            {/* Back Button */}
            <div>
                <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary mb-4">
                    <Link href="/learn">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to All Topics
                    </Link>
                </Button>
            </div>

            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{disaster.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {disaster.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full flex items-center gap-2 font-medium">
                            <AlertTriangle className="h-5 w-5" />
                            Disaster Guide
                        </div>
                        <div className="bg-muted text-muted-foreground px-4 py-2 rounded-full flex items-center gap-2 font-medium">
                            <Clock className="h-5 w-5" />
                            5 min read
                        </div>
                    </div>
                </div>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src={disaster.image}
                        alt={disaster.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="prose dark:prose-invert max-w-none">
                <div className="bg-card rounded-xl border p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                        About {disaster.title}
                    </h2>
                    <div className="leading-7 whitespace-pre-line text-lg">
                        {disaster.fullContent}
                    </div>
                </div>
            </div>

            {/* Safety Tips Tabs */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Safety Guidelines</h2>

                <Tabs defaultValue="before" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
                            <TabsTrigger value="before" className="text-md">Before</TabsTrigger>
                            <TabsTrigger value="during" className="text-md">During</TabsTrigger>
                            <TabsTrigger value="after" className="text-md">After</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="before" className="mt-0">
                        <SafetyCard
                            title="Preparation & Prevention"
                            icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
                            tips={disaster.tips.before}
                            variant="before"
                        />
                    </TabsContent>
                    <TabsContent value="during" className="mt-0">
                        <SafetyCard
                            title="Immediate Action"
                            icon={<PlayCircle className="h-6 w-6 text-blue-500" />}
                            tips={disaster.tips.during}
                            variant="during"
                        />
                    </TabsContent>
                    <TabsContent value="after" className="mt-0">
                        <SafetyCard
                            title="Recovery & Restoration"
                            icon={<Clock className="h-6 w-6 text-orange-500" />}
                            tips={disaster.tips.after}
                            variant="after"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function SafetyCard({ title, icon, tips, variant }: { title: string, icon: React.ReactNode, tips: string[], variant: 'before' | 'during' | 'after' }) {
    const bgColors = {
        before: "bg-green-500/5 border-green-500/20",
        during: "bg-blue-500/5 border-blue-500/20",
        after: "bg-orange-500/5 border-orange-500/20"
    };

    return (
        <Card className={`border-2 ${bgColors[variant]} shadow-sm`}>
            <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-background rounded-full shadow-sm border">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <ul className="space-y-4">
                    {tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors border border-transparent hover:border-border">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">
                                {index + 1}
                            </span>
                            <span className="text-lg text-muted-foreground">{tip}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
