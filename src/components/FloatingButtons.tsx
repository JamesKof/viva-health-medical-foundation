import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.129 6.744 3.047 9.379L1.054 31.49l6.328-2.012C9.94 31.108 12.872 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.606c-.392 1.104-1.942 2.02-3.186 2.288-.852.18-1.964.324-5.71-1.228-4.796-1.986-7.882-6.842-8.122-7.16-.23-.318-1.932-2.574-1.932-4.908s1.222-3.482 1.656-3.96c.434-.478.948-.598 1.264-.598.316 0 .632.002.908.016.292.016.682-.11 1.068.814.392.94 1.334 3.254 1.452 3.49.118.238.198.514.04.83-.158.318-.238.514-.474.794-.238.278-.498.622-.712.834-.238.238-.484.496-.208.974.278.478 1.234 2.034 2.65 3.296 1.82 1.622 3.354 2.124 3.832 2.362.478.238.756.198 1.034-.118.278-.318 1.194-1.392 1.512-1.87.318-.478.636-.398 1.074-.238.438.158 2.75 1.298 3.228 1.534.478.238.794.356.912.554.118.198.118 1.144-.274 2.248z" />
  </svg>
);

export const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/233530839578"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lifted hover:scale-110 transition-transform"
      >
        <WhatsAppIcon />
      </a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-24 left-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lifted hover:scale-110 transition-transform"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
