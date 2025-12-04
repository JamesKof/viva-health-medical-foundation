import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, HeartPulse, TrendingUp } from "lucide-react";

interface DonationMetrics {
  totalDonations: number;
  totalAmount: number;
  successful: number;
  failed: number;
  recurringCount: number;
}

export const DonationStats = () => {
  const [metrics, setMetrics] = useState<DonationMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.functions.invoke<DonationMetrics>(
          "donation-metrics"
        );

        if (error) throw error;
        if (data) setMetrics(data);
      } catch (err) {
        console.error("Failed to load donation metrics", err);
        setError("Unable to load live donation stats right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (isLoading && !metrics) {
    return (
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="h-24 rounded-2xl bg-muted animate-pulse" />
        <div className="h-24 rounded-2xl bg-muted animate-pulse" />
        <div className="h-24 rounded-2xl bg-muted animate-pulse" />
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <AlertCircle className="w-4 h-4" />
        <span>{error || "Donation stats are not available at the moment."}</span>
      </div>
    );
  }

  const successRate = metrics.totalDonations
    ? Math.round((metrics.successful / metrics.totalDonations) * 100)
    : 0;

  return (
    <section aria-label="Donation impact statistics" className="mt-8">
      <h3 className="text-sm font-semibold text-foreground/80 mb-3 tracking-wide uppercase">
        Live Impact Snapshot
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-card border border-border/60 rounded-2xl p-4 flex items-center gap-3 shadow-soft">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Successful donations logged</p>
            <p className="text-lg font-semibold text-foreground">
              {metrics.successful}
              {metrics.totalDonations > 0 && (
                <span className="ml-1 text-xs text-muted-foreground">/ {metrics.totalDonations}</span>
              )}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-2xl p-4 flex items-center gap-3 shadow-soft">
          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Overall success rate</p>
            <p className="text-lg font-semibold text-foreground">{successRate}%</p>
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-2xl p-4 flex items-center gap-3 shadow-soft">
          <div className="w-9 h-9 rounded-full bg-secondary/40 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Active recurring supporters</p>
            <p className="text-lg font-semibold text-foreground">{metrics.recurringCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
