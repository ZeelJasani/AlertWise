"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ArrowLeft, Package, Phone, HeartPulse, CheckCircle2, Loader2 } from "lucide-react";
import { Disaster } from "@/types";

export default function LearnPage() {
    const [disasters, setDisasters] = useState<Disaster[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDisasters = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/disasters`);
                if (res.ok) {
                    const data = await res.json();
                    setDisasters(data);
                } else {
                    console.error("Failed to fetch disasters");
                }
            } catch (error) {
                console.error("Error fetching disasters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDisasters();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-12 lg:px-24 max-w-6xl space-y-10">
            {/* Back Button */}
            <div>
                <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary transition-colors mb-4 group" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            {/* Header Section */}
            <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight">Learn & Prepare</h1>
                <p className="text-muted-foreground text-lg">
                    Comprehensive guides on disaster preparedness. Knowledge is your first line of defense.
                </p>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="disaster-types" className="w-full space-y-8">
                <TabsList className="h-12 w-fit bg-muted/50 p-1">
                    <TabsTrigger value="disaster-types" className="text-base px-6 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        Disaster Types
                    </TabsTrigger>
                    <TabsTrigger value="universal-safety" className="text-base px-6 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        Universal Safety
                    </TabsTrigger>
                </TabsList>

                {/* Tab 1: Disaster Grid */}
                <TabsContent value="disaster-types" className="mt-0 space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {disasters.map((disaster) => (
                            <Card key={disaster.slug} className="group overflow-hidden border-muted/60 hover:border-primary/50 transition-colors duration-300 flex flex-col p-4 bg-zinc-900/50">
                                <div className="relative h-60 w-full overflow-hidden rounded-xl">
                                    <Image
                                        src={disaster.image}
                                        alt={disaster.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardHeader className="p-0 pt-5">
                                    <CardTitle className="text-2xl font-bold">{disaster.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow p-0 pt-3">
                                    <CardDescription className="text-base line-clamp-3 leading-relaxed">
                                        {disaster.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="p-0 pt-6">
                                    <Button variant="ghost" className="w-full group/btn justify-start hover:bg-transparent hover:text-foreground transition-all px-0" asChild>
                                        <Link href={`/learn/${disaster.slug}`} className="flex items-center gap-2 text-primary">
                                            <span className="font-semibold">Learn More</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Tab 2: Universal Safety */}
                <TabsContent value="universal-safety" className="mt-0 space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                    <SafetyListCard
                        title="Emergency Kit Essentials"
                        icon={<Package className="h-6 w-6" />}
                        items={[
                            "Water - 1 gallon per person per day for 3 days",
                            "Non-perishable food for 3 days",
                            "Battery-powered radio",
                            "Flashlight and extra batteries",
                            "First aid kit",
                            "Whistle to signal for help",
                            "Dust mask, plastic sheeting, duct tape",
                            "Moist towelettes, garbage bags",
                            "Wrench or pliers to turn off utilities",
                            "Manual can opener",
                            "Local maps",
                            "Cell phone with chargers and backup battery"
                        ]}
                    />

                    <SafetyListCard
                        title="Communication Plan"
                        icon={<Phone className="h-6 w-6" />}
                        items={[
                            "Designate out-of-area emergency contact",
                            "Program ICE (In Case of Emergency) contacts",
                            "Keep written list of important numbers",
                            "Choose meeting places near home and outside neighborhood",
                            "Practice your plan regularly",
                            "Keep copies of important documents"
                        ]}
                    />

                    <SafetyListCard
                        title="First Aid Basics"
                        icon={<HeartPulse className="h-6 w-6" />}
                        items={[
                            "Control bleeding with direct pressure",
                            "Call 911 for chest pain or difficulty breathing",
                            "Cool burns with cool water for 10 minutes",
                            "Don't move someone with potential spinal injury",
                            "Learn CPR and basic first aid",
                            "Keep first aid manual with supplies"
                        ]}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function SafetyListCard({ title, icon, items }: { title: string, icon: React.ReactNode, items: string[] }) {
    return (
        <Card className="border-muted/60 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-2.5 bg-muted rounded-xl">
                    {icon}
                </div>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <CheckCircle2 className="h-5 w-5 text-primary/70 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
