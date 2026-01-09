"use client";

import {
	ActivityIcon,
	FlameIcon,
	MountainIcon,
	Plus,
	ShieldCheckIcon,
	SunIcon,
	WavesIcon,
	WindIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "./landing/testimonials";
import { Ripple } from "./ripple";

const features = [
	{
		id: 1,
		label: "Earthquakes",
		title: "Sudden, violent <strong>ground shaking</strong>.",
		description:
			"A sudden, violent shaking of the ground, often causing great destruction. One of the most common and unpredictable natural disasters worldwide.",
		icon: ActivityIcon,
	},
	{
		id: 2,
		label: "Floods",
		title: "Overwhelming <strong>overflow of water</strong>.",
		description:
			"Overwhelming overflow of water onto normally dry land. Common after heavy rain, tropical storms, and rapid snowmelt.",
		icon: WavesIcon,
	},
	{
		id: 3,
		label: "Wildfires",
		title: "Uncontrolled <strong>vegetation fires</strong>.",
		description:
			"Uncontrolled fires in areas of combustible vegetation. Increasingly common due to rising temperatures and dry climates.",
		icon: FlameIcon,
	},
	{
		id: 4,
		label: "Cyclones",
		title: "Powerful <strong>rotating storm</strong> systems.",
		description:
			"Powerful rotating storm systems. Common in coastal regions, bringing high-speed winds and torrential rainfall.",
		icon: WindIcon,
	},
	{
		id: 5,
		label: "Landslides",
		title: "Movement of <strong>rock and debris</strong>.",
		description:
			"The movement of a mass of rock, debris, or earth down a slope. Common in hilly terrains and areas with heavy rainfall.",
		icon: MountainIcon,
	},
	{
		id: 6,
		label: "Heatwaves",
		title: "Extended periods of <strong>excessive heat</strong>.",
		description:
			"Extended periods of excessively hot weather. Becoming a frequent global threat affecting health and resources.",
		icon: SunIcon,
	},
];

export default function Features({ stars }: { stars: string | null }) {
	return (
		<div className="md:w-10/12 mt-10 mx-auto relative md:border-l-0 md:border-b-0 md:border-[1.2px] rounded-none -pr-2 dark:bg-black/95 ">
			<div className="w-full md:mx-0">
				<div className="grid grid-cols-1 relative md:grid-rows-2 md:grid-cols-3 border-b-[1.2px]">
					<div className="hidden md:grid top-1/2 left-0 -translate-y-1/2 w-full grid-cols-3 z-10 pointer-events-none select-none absolute">
						<Plus className="w-8 h-8 text-neutral-300 translate-x-[16.5px] translate-y-[.5px] ml-auto dark:text-neutral-600" />
						<Plus className="w-8 h-8 text-neutral-300 ml-auto translate-x-[16.5px] translate-y-[.5px] dark:text-neutral-600" />
					</div>
					{features.map((feature, index) => (
						<div
							key={feature.id}
							className={cn(
								"justify-between md:border-l-[1.2px] md:min-h-[300px] border-t-[1.2px] md:border-t-0 transform-gpu flex flex-col p-8 2xl:p-10",
								index >= 3 && "md:border-t-[1.2px]",
							)}
						>
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2 mb-2">
									<feature.icon className="w-4 h-4" />
									<p className="text-gray-600 dark:text-gray-400">
										{feature.label}
									</p>
								</div>
								<div className="max-w-full">
									<div className="flex gap-3 ">
										<p
											className="max-w-lg text-xl font-normal tracking-tighter md:text-2xl"
											dangerouslySetInnerHTML={{
												__html: feature.title,
											}}
										/>
									</div>
								</div>
								<p className="mt-2 text-sm text-left text-muted-foreground">
									{feature.description}
								</p>
							</div>
							<a
								className="mt-8 flex items-center text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide hover:opacity-70 transition-opacity"
								href="/docs"
								target="_blank"
							>
								Start Learning
								<svg
									className="ml-2 w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</a>
						</div>
					))}
				</div>
				<div className="w-full md:border-l hidden md:block">
					<Testimonial />
				</div>
				<div className="relative col-span-3 md:border-l-[1.2px] md:border-t-[1.2px] h-full py-20">
					<div className="w-full h-full p-16 pt-10 md:px-10 2xl:px-16">
						<div className="flex flex-col items-center justify-center w-full h-full gap-3">
							<div className="flex items-center gap-2">
								<ShieldCheckIcon className="w-4 h-4" />
								<p className="text-gray-600 dark:text-gray-400">
									Always Prepared
								</p>
							</div>
							<p className="max-w-md mx-auto mt-4 text-4xl font-normal tracking-tighter text-center md:text-4xl">
								<strong>Master disaster readiness with confidence today!</strong>
							</p>
							<Ripple />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
