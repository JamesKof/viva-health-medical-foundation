import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "What We Do",
    to: "/what-we-do",
    children: [
      { label: "Blood Pressure & Sugar Checks", to: "/what-we-do" },
      { label: "Dental Screening", to: "/what-we-do" },
      { label: "Free Medication", to: "/what-we-do" },
      { label: "General Consultations", to: "/what-we-do" },
      { label: "NHIS Registration", to: "/what-we-do" },
      { label: "Eye Screening", to: "/what-we-do" },
    ],
  },
  { label: "Events", to: "/events" },
  {
    label: "Get Involved",
    to: "/volunteer",
    children: [
      { label: "Volunteer", to: "/volunteer" },
      { label: "Donate Cash", to: "/volunteer" },
      { label: "Accommodation Support", to: "/volunteer" },
      { label: "Sponsorship", to: "/volunteer" },
      { label: "Publicity", to: "/volunteer" },
    ],
  },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
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
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Viva Health Medical Foundation Logo"
            className="h-10 w-auto object-contain"
          />
          <span
            className={`font-bold text-lg tracking-tight hidden sm:block transition-colors ${
              isScrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            Viva Health
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.to}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-secondary"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>

              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 py-2 w-56 rounded-xl glass-strong shadow-lifted animate-scale-in z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.to}
                      className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to="/volunteer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:shadow-glow hover:scale-105"
        >
          Donate Now
        </Link>

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
              <Link
                to={item.to}
                className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors font-medium"
                onClick={() => {
                  if (!item.children) setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 border-l-2 border-primary/20 ml-4 mb-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.to}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/volunteer"
            className="block mt-4 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-center font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Donate Now
          </Link>
        </div>
      )}
    </nav>
  );
};
