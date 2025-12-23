import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Operations", href: "/operations" },
  { label: "Credentials", href: "/credentials" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-primary/95 backdrop-blur-md py-3 shadow-lg border-white/5"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start cursor-pointer">
            <span className={cn(
              "font-serif text-xl sm:text-2xl font-bold tracking-wide uppercase transition-colors",
              isScrolled ? "text-white" : "text-primary"
            )}>
              TrueNorth
            </span>
            <span className={cn(
              "text-[0.6rem] sm:text-xs tracking-[0.2em] uppercase transition-colors",
              isScrolled ? "text-accent" : "text-primary/70"
            )}>
              Bank Trust
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent relative group py-2",
                  location === item.href
                    ? "text-accent"
                    : isScrolled ? "text-gray-300" : "text-primary/80"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-accent transform origin-left transition-transform duration-300",
                  location === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? "text-white" : "text-primary"} />
            ) : (
              <Menu className={isScrolled ? "text-white" : "text-primary"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary border-t border-white/10 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col py-8 px-4 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-serif text-center py-3 border-b border-white/5 last:border-0 hover:text-accent transition-colors",
                  location === item.href ? "text-accent" : "text-white/80"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
