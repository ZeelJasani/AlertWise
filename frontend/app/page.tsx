import Link from "next/link";
import Features from "@/components/features";
import Hero from "@/components/landing/hero";
import Section from "@/components/landing/section";

export default async function HomePage() {
  // Mock stars for now since fetch might fail or not be relevant
  const stars = "1,234";
  return (
    <main className="h-min mx-auto overflow-x-hidden">
      <Section
        className="mb-1 overflow-y-clip"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <Hero />
        <Features stars={stars} />
        <hr className="h-px bg-border" />
      </Section>
    </main>
  );
}
