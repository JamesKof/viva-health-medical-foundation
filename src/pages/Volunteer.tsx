import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { VolunteerSection } from "@/components/VolunteerSection";
import { Footer } from "@/components/Footer";
import { DonationModal } from "@/components/DonationModal";
import { DonationStats } from "@/components/DonationStats";
import { PageSEO } from "@/components/PageSEO";
import { useAnalytics } from "@/hooks/useAnalytics";

const Volunteer = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleOpenDonate = () => {
    trackEvent("cta_donate_click", { source: "volunteer_page" });
    setIsDonationModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Volunteer & Donate"
        description="Become a Viva Health volunteer or supporter and help deliver life-changing healthcare to underserved communities."
      />
      <Navbar />

      <section className="pt-32 pb-12 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">Get Involved</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl">
          Join a community of people changing healthcare, one outreach at a time
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Whether you are a health professional, student, corporate partner, or supporter, there is a place for you in
          the Viva Health volunteer family. Choose the level of commitment that fits your season of life.
        </p>

        <DonationStats />
      </section>

      <VolunteerSection onDonateClick={handleOpenDonate} />
      <Footer />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </main>
  );
};

export default Volunteer;
