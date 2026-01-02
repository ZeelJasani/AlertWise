import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeatureGrid />

      {/* Call to Action Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-[3rem] bg-zinc-900/30 border border-white/5 px-8 py-16 sm:px-16 sm:py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Ready to Get Prepared?
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-8 text-zinc-400 mb-10">
              Join thousands of users who trust AlertWise for their safety and disaster management needs. Start your journey today.
            </p>
            <div className="flex justify-center gap-4">
              <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Create Account
              </button>
              <button className="rounded-full border border-white/10 px-8 py-3 text-sm font-bold text-white hover:bg-white/5 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">AlertWise © 2026</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
