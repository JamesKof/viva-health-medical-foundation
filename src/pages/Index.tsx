import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { VideoSection } from "@/components/VideoSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VolunteerSection } from "@/components/VolunteerSection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { DonationModal } from "@/components/DonationModal";
import { PageSEO } from "@/components/PageSEO";

const Index = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    return (
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Viva Health Medical Foundation"
          description="Free medical outreaches, screenings, and health education programs bringing quality care to underserved communities in Ghana."
        />
        <Navbar />
        <Hero />
        <FeatureCards />
        <AboutSection />
        <ServicesSection />
        <VideoSection />
        <GallerySection />
        <TestimonialsSection />
        <VolunteerSection onDonateClick={() => setIsDonationModalOpen(true)} />
        <BlogSection />
        <Footer />
      
      {/* Floating Donate Button */}
      <button
        onClick={() => {
          setIsDonationModalOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold shadow-lifted hover:scale-105 transition-transform animate-pulse"
      >
        Donate Now
      </button>
      
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </main>
  );
};

export default Index;
