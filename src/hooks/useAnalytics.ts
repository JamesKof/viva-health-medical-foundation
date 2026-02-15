import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
  }, []);

  const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;

    try {
      // Fire GA4 event via gtag
      if (window.gtag) {
        window.gtag("event", eventName, payload || {});
      }

      // Also push to dataLayer for GTM compatibility
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        timestamp: Date.now(),
        ...payload,
      });

      if (import.meta.env.DEV) {
        console.info("[Analytics]", eventName, payload || {});
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("Analytics tracking failed", error);
      }
    }
  };

  return { trackEvent };
};
