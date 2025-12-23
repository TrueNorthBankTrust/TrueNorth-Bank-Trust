import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 border-t-4 border-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl font-bold tracking-wide uppercase text-white">
                TrueNorth
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-accent">
                Bank Trust
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              A Delaware‑domiciled sovereign fiduciary entity specializing in strategic asset integration and institutional oversight.
            </p>
          </div>

          {/* Identifiers */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-accent">Institutional Identifiers</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Federal EIN</span>
                <span className="font-mono text-white">39‑7216475</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>D‑U‑N‑S®</span>
                <span className="font-mono text-white">144857626</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Ref. Filing</span>
                <span className="font-mono text-white">TNBT‑5554B</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-accent">Secure Contact</h3>
            <div className="flex flex-col space-y-4">
              <a 
                href="mailto:truenorthbankmainbranch@californiamail.com"
                className="text-sm text-white/70 hover:text-accent transition-colors flex flex-col"
              >
                <span className="text-xs uppercase tracking-wider text-white/40 mb-1">Institutional</span>
                truenorthbankmainbranch@californiamail.com
              </a>
              <a 
                href="mailto:NSU@socialworker.net"
                className="text-sm text-white/70 hover:text-accent transition-colors flex flex-col"
              >
                <span className="text-xs uppercase tracking-wider text-white/40 mb-1">Sovereign & Private</span>
                NSU@socialworker.net
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} TrueNorth Bank Trust. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
