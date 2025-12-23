import { PageTransition } from "@/components/PageTransition";
import { Fingerprint, FileBadge, Hash } from "lucide-react";

export default function Credentials() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              Institutional Identifiers
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              TrueNorth Bank Trust adheres to stringent fiduciary protocols. All credentialing, valuations, and filings are maintained for archival reference and partner scrutiny under the following documented identifiers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center hover:border-accent transition-colors duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Hash className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Federal EIN</h3>
              <p className="text-3xl font-mono text-primary font-bold">39‑7216475</p>
              <p className="text-xs text-muted-foreground mt-4">IRS Registered Tax Identity</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center hover:border-accent transition-colors duration-300 transform md:-translate-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Fingerprint className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">D‑U‑N‑S® Number</h3>
              <p className="text-3xl font-mono text-primary font-bold">144857626</p>
              <p className="text-xs text-muted-foreground mt-4">Dun & Bradstreet Verified</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center hover:border-accent transition-colors duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <FileBadge className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Reference Filing</h3>
              <p className="text-3xl font-mono text-primary font-bold">TNBT‑5554B</p>
              <p className="text-xs text-muted-foreground mt-4">Internal Institutional Record</p>
            </div>
          </div>

          <div className="mt-20 max-w-4xl mx-auto bg-primary text-white p-10 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-2">Verification Inquiries</h3>
                <p className="text-white/70">
                  This site serves as a Digital Ledger of Truth for institutional partners, valuation firms, and sovereign wealth entities.
                </p>
              </div>
              <a href="/contact" className="px-6 py-3 bg-accent text-primary font-bold text-sm uppercase tracking-wider rounded hover:bg-white transition-colors shrink-0">
                Contact Compliance
              </a>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
