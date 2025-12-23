import { PageTransition } from "@/components/PageTransition";
import { Building2, TrendingUp, FileText } from "lucide-react";

export default function Operations() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              Operations & <br/>Strategic Integration
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We execute high-value transitions of capital into physical anchors. Our current operational focus involves significant acquisition strategies within the US commercial real estate sector.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Acquisition Card */}
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/5 rounded-full">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Strategic Acquisition</h3>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  TrueNorth Bank Trust is executing the fiduciary integration of <strong className="text-primary">555 California Street, San Francisco</strong>. This landmark asset represents a core component of our sovereign portfolio expansion strategy.
                </p>
                
                <div className="p-6 bg-slate-900 text-white rounded-lg">
                  <div className="text-xs uppercase tracking-widest text-accent mb-2">Acquisition Strategy Value</div>
                  <div className="text-3xl md:text-4xl font-serif font-bold">$4,000,000,000</div>
                </div>
              </div>
            </div>

            {/* Corpus Card */}
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border-l-4 border-accent">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-full">
                  <TrendingUp className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Capital Management</h3>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Our operations are underpinned by a recorded foundational corpus enabling stability and liquidity for institutional transactions. This creates a secure bedrock for long-term sovereign wealth preservation.
                </p>
                
                <div className="p-6 bg-accent text-primary rounded-lg">
                  <div className="text-xs uppercase tracking-widest text-primary/70 mb-2">Recorded Foundational Corpus</div>
                  <div className="text-3xl md:text-4xl font-serif font-bold">$90,000,000,000</div>
                </div>
              </div>
            </div>
          </div>

          {/* Valuation Section */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-wider text-xs mb-4">
                  <FileText className="w-4 h-4" />
                  <span>Verified Valuation</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-primary mb-6">Systemic Impact Modeling</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We are currently engaged in a formal Conclusion of Value process with Aranca, a leading global research and advisory firm.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This process documents and contextualizes a <strong className="text-primary">$3.2 trillion systemic impact model</strong> into tangible asset holdings, ensuring rigorous third-party verification of our economic footprint.
                </p>
              </div>
              {/* Unsplash Abstract Image: Data/Charts/Analysis */}
              {/* Image of abstract financial data or network representing valuation */}
              <div className="h-64 md:h-auto relative bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Financial Modeling Analysis" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-transparent"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
