import { noSSR } from "foxact/no-ssr";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const testimonials = [
	{
		name: "Sarah Johnson",
		description: "This platform has transformed how we teach disaster readiness. The interactive quizzes and real-time alerts have made our community more prepared than ever before. The earthquake safety module alone has helped hundreds of families create effective emergency plans.",
		avatar: "https://randomuser.me/api/portraits/women/12.jpg",
	},
	{
		name: "Dr. Michael Chen",
		description: "As someone who has worked in disaster response for 15 years, I'm impressed by how comprehensive and accurate the information is. The wildfire preparedness section is particularly well-researched and presented in a way that's easy for anyone to understand and act upon.",
		avatar: "https://randomuser.me/api/portraits/men/12.jpg",
	},
	{
		name: "Emma Rodriguez",
		description: "We've implemented this platform across our school district for disaster education. The interactive elements keep students engaged while teaching critical life-saving skills. The flood response training has been invaluable for our coastal community.",
		avatar: "https://randomuser.me/api/portraits/women/13.jpg",
	},
	{
		name: "David Kim",
		description: "The real-time alert system and emergency checklists have been game-changers for our neighborhood watch program. The heatwave safety tips helped us protect vulnerable community members during last summer's record temperatures.",
		avatar: "https://randomuser.me/api/portraits/men/13.jpg",
	},
	{
		name: "Sarah Johnson",
		description: "This platform has transformed how we teach disaster readiness. The interactive quizzes and real-time alerts have made our community more prepared than ever before. The earthquake safety module alone has helped hundreds of families create effective emergency plans.",
		avatar: "https://randomuser.me/api/portraits/women/12.jpg",
	},
	{
		name: "Dr. Michael Chen",
		description: "As someone who has worked in disaster response for 15 years, I'm impressed by how comprehensive and accurate the information is. The wildfire preparedness section is particularly well-researched and presented in a way that's easy for anyone to understand and act upon.",
		avatar: "https://randomuser.me/api/portraits/men/12.jpg",
	},
	{
		name: "Emma Rodriguez",
		description: "We've implemented this platform across our school district for disaster education. The interactive elements keep students engaged while teaching critical life-saving skills. The flood response training has been invaluable for our coastal community.",
		avatar: "https://randomuser.me/api/portraits/women/13.jpg",
	},
	{
		name: "David Kim",
		description: "The real-time alert system and emergency checklists have been game-changers for our neighborhood watch program. The heatwave safety tips helped us protect vulnerable community members during last summer's record temperatures.",
		avatar: "https://randomuser.me/api/portraits/men/13.jpg",
	},
	// New testimonials
	{
		name: "Dr. Lisa Wong",
		description: "As an emergency room physician, I've seen the difference preparedness makes. This platform's clear, actionable advice has helped our hospital staff and patients be better prepared for disasters. The emergency kit checklist is now our gold standard.",
		avatar: "https://randomuser.me/api/portraits/women/14.jpg",
	},
	{
		name: "Carlos Mendez",
		description: "The hurricane preparedness guide saved our family's home. We followed the platform's recommendations for securing our property and creating an evacuation plan. When the storm hit, we were ready and stayed safe throughout.",
		avatar: "https://randomuser.me/api/portraits/men/14.jpg",
	},
	{
		name: "Nina Patel",
		description: "I never realized how unprepared I was until I took the disaster readiness quiz. The personalized action plan it generated helped me create a comprehensive emergency kit and evacuation strategy for my family. The peace of mind is priceless.",
		avatar: "https://randomuser.me/api/portraits/women/15.jpg",
	},
	{
		name: "James Wilson",
		description: "As a scout leader, I use this platform to teach essential survival skills to our troop. The first aid tutorials and emergency response guides are clear, practical, and potentially life-saving. Highly recommended for any community group!",
		avatar: "https://randomuser.me/api/portraits/men/15.jpg",
	},
	{
		name: "Aisha Bah",
		description: "The platform's wildfire evacuation routes and real-time alert system helped our community evacuate safely during last season's fires. The step-by-step guides made it easy for everyone to understand what to do, even in stressful situations.",
		avatar: "https://randomuser.me/api/portraits/women/16.jpg",
	},
	{
		name: "Robert Zhang",
		description: "I'm a civil defense volunteer, and this has become our go-to resource for community training. The disaster simulation exercises are incredibly realistic and have significantly improved our response times in emergency drills.",
		avatar: "https://randomuser.me/api/portraits/men/16.jpg",
	},
	{
		name: "Maria Garcia",
		description: "After experiencing an earthquake with my children, I was determined to be better prepared. This platform's family emergency plan builder is comprehensive yet simple to follow. We now have a clear plan for any disaster scenario.",
		avatar: "https://randomuser.me/api/portraits/women/17.jpg",
	},
	{
		name: "Thomas Okafor",
		description: "The platform's mobile app with offline access to emergency procedures was a lifesaver during the recent power outages. Even without internet, we had access to critical information when we needed it most.",
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
									"flex flex-col justify-between h-[300px] rounded-xl border border-black/10 shrink-0 grow-0 w-[450px] bg-white dark:bg-zinc-950 dark:border-white/10 shadow-sm transition-all hover:shadow-md",
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








