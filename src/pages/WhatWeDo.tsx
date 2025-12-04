import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { VideoSection } from "@/components/VideoSection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const WhatWeDo = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="What We Do"
        description="Discover how Viva Health Medical Foundation delivers free medical outreaches, screenings, and health education."
      />
      <Navbar />
      <ServicesSection />
      <VideoSection />
      <Footer />
    </main>
  );
};

export default WhatWeDo;
