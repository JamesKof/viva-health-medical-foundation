import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { VolunteerSection } from "@/components/VolunteerSection";
import { Footer } from "@/components/Footer";
import { DonationModal } from "@/components/DonationModal";
import { PageSEO } from "@/components/PageSEO";

const Volunteer = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Volunteer & Donate"
        description="Become a Viva Health volunteer or supporter and help deliver life-changing healthcare to underserved communities."
      />
      <Navbar />

      <section className="pt-32 pb-12 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">Get Involved</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Volunteer with Viva Health
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Whether you are a health professional, student, or passionate supporter, there is a place for you in
          Viva Health&apos;s volunteer family. Choose how you want to engage and support our medical outreaches across
          Ghana.
        </p>
      </section>

      <VolunteerSection onDonateClick={() => setIsDonationModalOpen(true)} />
      <Footer />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </main>
  );
};

export default Volunteer;
