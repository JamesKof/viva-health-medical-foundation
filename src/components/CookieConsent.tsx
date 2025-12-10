import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Can't disable necessary cookies
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-lifted overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We use cookies to enhance your browsing experience, serve personalized content, 
                    and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                    Read our{" "}
                    <Link to="/cookies-policy" className="text-primary hover:underline">
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>

                  <AnimatePresence>
                    {showCustomize && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 mb-4 pt-4 border-t border-border">
                          {/* Necessary Cookies */}
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium text-foreground text-sm">Necessary Cookies</p>
                              <p className="text-xs text-muted-foreground">
                                Required for the website to function properly
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Always on</span>
                              <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                                <div className="w-4 h-4 bg-primary-foreground rounded-full" />
                              </div>
                            </div>
                          </div>

                          {/* Analytics Cookies */}
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium text-foreground text-sm">Analytics Cookies</p>
                              <p className="text-xs text-muted-foreground">
                                Help us understand how visitors interact with our site
                              </p>
                            </div>
                            <button
                              onClick={() => togglePreference("analytics")}
                              className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                                preferences.analytics ? "bg-primary justify-end" : "bg-border justify-start"
                              }`}
                            >
                              <div className="w-4 h-4 bg-primary-foreground rounded-full" />
                            </button>
                          </div>

                          {/* Marketing Cookies */}
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium text-foreground text-sm">Marketing Cookies</p>
                              <p className="text-xs text-muted-foreground">
                                Used to deliver relevant advertisements
                              </p>
                            </div>
                            <button
                              onClick={() => togglePreference("marketing")}
                              className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                                preferences.marketing ? "bg-primary justify-end" : "bg-border justify-start"
                              }`}
                            >
                              <div className="w-4 h-4 bg-primary-foreground rounded-full" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-3">
                    {showCustomize ? (
                      <>
                        <Button
                          onClick={handleSavePreferences}
                          className="gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save Preferences
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowCustomize(false)}
                        >
                          Back
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={handleAcceptAll} className="gap-2">
                          <Check className="w-4 h-4" />
                          Accept All
                        </Button>
                        <Button variant="outline" onClick={handleRejectAll} className="gap-2">
                          <X className="w-4 h-4" />
                          Reject All
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setShowCustomize(true)}
                          className="gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Customize
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
