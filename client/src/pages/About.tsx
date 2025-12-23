import { PageTransition } from "@/components/PageTransition";
import { Check } from "lucide-react";

export default function About() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase block mb-4">
                Who We Are
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
                Institutional Stewardship & <br />Sovereign Compliance
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                TrueNorth Bank Trust is a Delaware‑domiciled sovereign fiduciary entity. We exist to verify, integrate, and safeguard high-scale capital within the regulated global economy.
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-100 mb-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-6">Our Mandate</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Our operations support major acquisitions and capital stewardship rooted in verified financial corpus and documented valuation frameworks. We do not merely manage wealth; we structure the institutional reality of sovereign assets.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By maintaining an authoritative record of fiduciary actions, we serve as a trusted bridge between intangible capital valuation and tangible market assets.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">Core Competencies</h4>
                  <ul className="space-y-4">
                    {[
                      "Institutional Fiduciary Oversight",
                      "Strategic Asset Integration",
                      "Valuation Model Verification",
                      "Sovereign Portfolio Management",
                      "Regulatory Compliance Filing"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-serif font-bold text-primary mb-2">DE</div>
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Domicile</div>
                <p className="text-sm text-muted-foreground">Operating under Delaware statutory trust laws for maximum stability.</p>
              </div>
              <div className="p-6 border-l border-r border-gray-200">
                <div className="text-4xl font-serif font-bold text-primary mb-2">Tier-1</div>
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Stakeholders</div>
                <p className="text-sm text-muted-foreground">Serving sovereign entities and institutional partners globally.</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-serif font-bold text-primary mb-2">Verified</div>
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Valuation</div>
                <p className="text-sm text-muted-foreground">Documented corpus and compliance frameworks.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
