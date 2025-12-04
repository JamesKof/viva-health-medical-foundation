import { useEffect } from "react";

export const useAnalytics = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    (window as any).dataLayer = (window as any).dataLayer || [];
  }, []);

  const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;

    const eventPayload = {
      event: eventName,
      timestamp: Date.now(),
      ...payload,
    };

    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(eventPayload);
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.info("[Analytics]", eventName, payload || {});
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("Analytics tracking failed", error);
      }
    }
  };

  return { trackEvent };
};
