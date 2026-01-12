import Features from "@/components/features";
import Hero from "@/components/landing/hero";
import Section from "@/components/landing/section";

export default async function HomePage() {
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
        <Features />
        <hr className="h-px bg-border" />
      </Section>
    </main>
  );
}
