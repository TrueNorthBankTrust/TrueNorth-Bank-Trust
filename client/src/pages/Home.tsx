import { PageTransition } from "@/components/PageTransition";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Scale, Globe } from "lucide-react";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary text-white pt-20">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Abstract architectural lines */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] border border-white/10 rounded-full translate-x-1/2 -translate-y-1/4" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-white/10 rounded-full translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] border border-white/10 rounded-full -translate-x-1/3 translate-y-1/4" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-3 py-1 border border-accent/50 rounded-full">
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                Sovereign Fiduciary Entity
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              Strategic Sovereign <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-200">
                Fiduciary Oversight
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Bridging high‑scale intangible capital with physical market anchors. 
              We provide institutional oversight, strategic asset integration, and 
              verification of valuation models for tier‑1 global stakeholders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/operations" className="px-8 py-4 bg-accent text-primary font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300 rounded shadow-lg shadow-accent/20">
                Our Operations
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-colors duration-300 rounded backdrop-blur-sm">
                Secure Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative -mt-32">
            {[
              {
                icon: ShieldCheck,
                title: "Asset Integration",
                desc: "Strategic integration of trophy assets into the global financial ecosystem with documented identifiers."
              },
              {
                icon: Scale,
                title: "Fiduciary Compliance",
                desc: "Strict adherence to institutional protocols safeguarding capital and certifying fiduciary actions."
              },
              {
                icon: Globe,
                title: "Global Valuation",
                desc: "Formal Conclusion of Value processes documenting systemic impact models into tangible holdings."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-lg shadow-xl shadow-black/5 border-t-4 border-accent hover:transform hover:-translate-y-1 transition-all duration-300">
                <feature.icon className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-serif font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              {/* Unsplash Abstract Image: Modern Architecture/Vault */}
              {/* Image of modern concrete architecture representing stability */}
              <div className="relative">
                <div className="absolute -inset-4 border border-primary/10 rounded-lg transform rotate-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Financial District Architecture" 
                  className="rounded-lg shadow-2xl grayscale contrast-[1.1] relative z-10"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                A Digital Ledger of Truth
              </h2>
              <div className="w-20 h-1 bg-accent"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                TrueNorth Bank Trust operates under strict institutional protocols. We maintain an authoritative record of fiduciary actions, asset transitions, and compliance filings to serve partners, regulatory stakeholders, and strategic collaborators.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded border border-gray-100">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-medium text-primary">$90B+ Recorded Foundational Corpus</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded border border-gray-100">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-medium text-primary">$4B Acquisition Strategy Execution</span>
                </div>
              </div>
              <Link href="/about" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors mt-4">
                View Institutional Profile <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
