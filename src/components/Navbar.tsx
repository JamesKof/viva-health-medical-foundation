import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  {
    label: "What We Do",
    href: "#services",
    children: [
      { label: "Blood Pressure & Sugar Checks", href: "#services" },
      { label: "Dental Screening", href: "#services" },
      { label: "Free Medication", href: "#services" },
      { label: "General Consultations", href: "#services" },
      { label: "NHIS Registration", href: "#services" },
      { label: "Eye Screening", href: "#services" },
    ],
  },
  {
    label: "Get Involved",
    href: "#volunteer",
    children: [
      { label: "Volunteer", href: "#volunteer" },
      { label: "Donate Cash", href: "#volunteer" },
      { label: "Accommodation Support", href: "#volunteer" },
      { label: "Sponsorship", href: "#volunteer" },
      { label: "Publicity", href: "#volunteer" },
    ],
  },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-2",
        isScrolled
          ? "glass-strong shadow-lifted w-[95%] max-w-6xl py-2"
          : "bg-transparent w-full max-w-7xl py-4"
      )}
    >
      <div className="flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            V
          </div>
          <span className={`font-bold text-lg tracking-tight hidden sm:block transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
            Viva Health
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-secondary"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </a>

              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 py-2 w-56 rounded-xl glass-strong shadow-lifted animate-scale-in z-50">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#volunteer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:shadow-glow hover:scale-105"
        >
          Donate Now
        </a>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-full transition-colors",
            isScrolled ? "hover:bg-secondary text-foreground" : "hover:bg-primary-foreground/10 text-primary-foreground"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl glass-strong shadow-lifted p-4 animate-scale-in">
          {navItems.map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors font-medium"
                onClick={() => !item.children && setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
              {item.children && (
                <div className="pl-4 border-l-2 border-primary/20 ml-4 mb-2">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="#volunteer"
            className="block mt-4 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-center font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Donate Now
          </a>
        </div>
      )}
    </nav>
  );
};
