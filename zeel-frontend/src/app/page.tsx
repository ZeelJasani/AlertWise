import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";

export default function Home() {
  return (
    <div className="flex flex-col bg-background transition-colors duration-500">
      <Hero />
      <FeatureGrid />

      {/* Call to Action Section */}
      <section className="py-24 bg-white border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-[2.5rem] bg-primary px-8 py-16 sm:px-16 sm:py-24 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%,transparent)] bg-size-[64px_64px] opacity-20" />

            <h2 className="relative z-10 text-3xl font-black tracking-tighter text-white sm:text-4xl mb-6 uppercase">
              Join the Movement for Safety
            </h2>
            <p className="relative z-10 mx-auto max-w-xl text-lg leading-8 text-white/80 mb-10 font-bold uppercase tracking-tight">
              Join thousands of students and citizens who trust DisasterEdu for their emergency preparedness training.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <button className="rounded-xl bg-white px-10 py-5 text-sm font-black text-primary hover:bg-secondary transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                Create Account
              </button>
              <button className="rounded-xl border-2 border-white/20 bg-white/10 px-10 py-5 text-sm font-black text-white hover:bg-white/20 transition-all active:scale-95 uppercase tracking-widest">
                Partner with us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter text-primary uppercase">DisasterEdu</span>
          </div>
          <div className="flex gap-8 text-[11px] text-muted-foreground font-black uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
