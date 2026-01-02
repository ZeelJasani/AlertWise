"use client";

import { motion } from "framer-motion";
import { Shield, Droplets, Flame, Wind, Mountain, Sun, ArrowRight } from "lucide-react";
import Link from "next/link";

const disasters = [
    {
        title: "Earthquakes",
        description: "A sudden, violent shaking of the ground, often causing great destruction. One of the most common and unpredictable natural disasters worldwide.",
        icon: Shield,
        href: "/learn/earthquake-safety",
    },
    {
        title: "Floods",
        description: "Overwhelming overflow of water onto normally dry land. Common after heavy rain, tropical storms, and rapid snowmelt.",
        icon: Droplets,
        href: "/learn/flood-safety",
    },
    {
        title: "Wildfires",
        description: "Uncontrolled fires in areas of combustible vegetation. Increasingly common due to rising temperatures and dry climates.",
        icon: Flame,
        href: "/learn/wildfire-safety",
    },
    {
        title: "Cyclones",
        description: "Powerful rotating storm systems. Common in coastal regions, bringing high-speed winds and torrential rainfall.",
        icon: Wind,
        href: "/learn/cyclone-safety",
    },
    {
        title: "Landslides",
        description: "The movement of a mass of rock, debris, or earth down a slope. Common in hilly terrains and areas with heavy rainfall.",
        icon: Mountain,
        href: "/learn/landslide-safety",
    },
    {
        title: "Heatwaves",
        description: "Extended periods of excessively hot weather. Becoming a frequent global threat affecting health and resources.",
        icon: Sun,
        href: "/learn/heatwave-safety",
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-24 bg-white relative transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {disasters.map((disaster, index) => (
                        <motion.div
                            key={disaster.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={disaster.href}
                                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-10 transition-all hover:shadow-md hover:border-primary/20"
                            >
                                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/50 text-primary transition-all group-hover:scale-105">
                                    <disaster.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-black text-primary mb-4 uppercase tracking-tight">{disaster.title}</h3>
                                <p className="text-muted-foreground leading-relaxed font-bold text-base mb-8 grow">{disaster.description}</p>

                                <div className="flex items-center gap-2 text-sm font-black text-primary uppercase tracking-widest group-hover:gap-3 transition-all">
                                    Start Learning <ArrowRight className="h-4 w-4" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
