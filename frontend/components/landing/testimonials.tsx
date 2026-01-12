import { noSSR } from "foxact/no-ssr";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const testimonials = [
	{
		name: "Sarah Johnson",
		description: "This platform changed how we teach disaster safety. The quizzes and alerts really help families stay prepared, especially for earthquakes.",
		avatar: "https://randomuser.me/api/portraits/women/12.jpg",
	},
	{
		name: "Dr. Michael Chen",
		description: "I’ve worked in disaster response for many years, and this platform is very reliable. The wildfire section is clear and easy to follow.",
		avatar: "https://randomuser.me/api/portraits/men/12.jpg",
	},
	{
		name: "Emma Rodriguez",
		description: "We use this platform in our schools to teach disaster safety. Students enjoy it, and the flood training has been very helpful for our area.",
		avatar: "https://randomuser.me/api/portraits/women/13.jpg",
	},
	{
		name: "David Kim",
		description: "The alerts and emergency checklists helped our neighborhood stay safe. The heatwave tips were especially useful last summer.",
		avatar: "https://randomuser.me/api/portraits/men/13.jpg",
	},
	{
		name: "Sarah Johnson",
		description: "This platform made disaster learning simple and effective. Our community feels much more ready now.",
		avatar: "https://randomuser.me/api/portraits/women/12.jpg",
	},
	{
		name: "Dr. Michael Chen",
		description: "The information here is accurate and easy to understand. It’s a great resource for anyone preparing for emergencies.",
		avatar: "https://randomuser.me/api/portraits/men/12.jpg",
	},
	{
		name: "Emma Rodriguez",
		description: "It’s a great tool for teaching kids important safety skills. The lessons are engaging and practical.",
		avatar: "https://randomuser.me/api/portraits/women/13.jpg",
	},
	{
		name: "David Kim",
		description: "This platform helped us support elderly neighbors during extreme heat. Very useful and easy to use.",
		avatar: "https://randomuser.me/api/portraits/men/13.jpg",
	},
	{
		name: "Dr. Lisa Wong",
		description: "As a doctor, I see how important preparation is. The emergency kit checklist is simple and very helpful.",
		avatar: "https://randomuser.me/api/portraits/women/14.jpg",
	},
	{
		name: "Carlos Mendez",
		description: "The hurricane guide helped my family stay safe. We knew exactly what to do when the storm arrived.",
		avatar: "https://randomuser.me/api/portraits/men/14.jpg",
	},
	{
		name: "Nina Patel",
		description: "The readiness quiz opened my eyes. It helped me create a simple emergency plan for my family.",
		avatar: "https://randomuser.me/api/portraits/women/15.jpg",
	},
	{
		name: "James Wilson",
		description: "I use this platform to teach survival skills. The first aid guides are clear and easy to understand.",
		avatar: "https://randomuser.me/api/portraits/men/15.jpg",
	},
	{
		name: "Aisha Bah",
		description: "During wildfires, the alerts and evacuation guides helped our community stay safe and calm.",
		avatar: "https://randomuser.me/api/portraits/women/16.jpg",
	},
	{
		name: "Robert Zhang",
		description: "This is our main training resource for community drills. The simulations feel real and useful.",
		avatar: "https://randomuser.me/api/portraits/men/16.jpg",
	},
	{
		name: "Maria Garcia",
		description: "After an earthquake, this platform helped my family create a clear emergency plan we trust.",
		avatar: "https://randomuser.me/api/portraits/women/17.jpg",
	},
	{
		name: "Thomas Okafor",
		description: "Offline access helped us during power cuts. We could still read emergency steps when needed.",
		avatar: "https://randomuser.me/api/portraits/men/17.jpg",
	}
];


type TestimonialProps = (typeof testimonials)[number];

const TestimonialItem = ({
	reverse = false,
	testimonials,
	noSsr,
}: {
	reverse?: boolean;
	testimonials: TestimonialProps[];
	noSsr?: boolean;
}) => {
	noSsr && noSSR();
	const animeSeconds = testimonials.length * 10;
	return (
		<div className="max-w-full mx-auto">
			<div
				className={`[--anime-duration:${animeSeconds}s] px-10 mx-auto w-full`}
			>
				<div
					style={{
						animationDuration: `${animeSeconds}s`,
					}}
					className={cn(
						"scroller flex flex-nowrap w-max min-w-full duration-[1000s] hover:[animation-play-state:paused] overflow-hidden relative gap-5 justify-around shrink-0",
						reverse ? "animate-hrtl-scroll-reverse" : "animate-hrtl-scroll",
					)}
				>
					{testimonials.map((testimonial, indx) => {
						return (
							<div
								key={indx}
								className={cn(
									"flex flex-col justify-between h-[200px] rounded-xl border border-black/10 shrink-0 grow-0 w-[300px] bg-white dark:bg-black dark:border-white/5 shadow-sm transition-all hover:shadow-md",
								)}
							>
								<div className="flex-1 overflow-hidden">
									<p className="px-6 py-6 tracking-tight text-lg font-light leading-relaxed text-pretty text-zinc-700 dark:text-zinc-300">
										&quot;{testimonial.description}&quot;
									</p>
								</div>
								<div className="flex items-center w-full gap-2 px-4 py-2 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-b-xl">
									<img
										src={testimonial.avatar}
										className="w-6 h-6 rounded-full object-cover ring-1 ring-white dark:ring-zinc-800"
										alt={testimonial.name}
									/>
									<div className="flex flex-col items-start justify-center">
										<h5 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
											{testimonial.name}
										</h5>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export const Testimonial = () => {
	return (
		<div className="max-w-full py-5 mx-auto overflow-hidden">
			<div className="flex flex-col gap-3">
				<div
					style={{
						maskImage:
							"linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
					}}
					className="relative flex justify-around gap-5 overflow-hidden shrink-0"
				>
					<Suspense
						fallback={
							<TestimonialItem
								testimonials={Array(15)
									.fill(
										testimonials.slice(
											Math.floor(testimonials.length / 2) + 1,
											testimonials.length - 1,
										),
									)
									.flat()}
							/>
						}
					>
						<TestimonialItem
							noSsr
							reverse
							testimonials={Array(15)
								.sort(() => Math.random() - 0.5)
								.fill(
									testimonials.slice(0, Math.floor(testimonials.length / 2)),
								)
								.flat()}
						/>
					</Suspense>
				</div>
				<div
					style={{
						maskImage:
							"linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
					}}
					className="relative flex justify-around gap-5 overflow-hidden shrink-0"
				>
					<Suspense
						fallback={
							<TestimonialItem
								testimonials={Array(15)
									.fill(
										testimonials.slice(
											Math.floor(testimonials.length / 2) + 1,
											testimonials.length - 1,
										),
									)
									.flat()}
							/>
						}
					>
						<TestimonialItem
							noSsr
							testimonials={Array(15)
								.sort(() => Math.random() - 0.5)
								.fill(
									testimonials.slice(
										Math.floor(testimonials.length / 2) + 1,
										testimonials.length - 1,
									),
								)
								.flat()}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
};








