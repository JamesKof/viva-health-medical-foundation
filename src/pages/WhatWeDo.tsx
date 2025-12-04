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
        description="See how Viva Health Medical Foundation delivers free clinics, screenings, and health education across Ghana."
      />
      <Navbar />

      <section className="pt-32 pb-12 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">Our Work</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl">
          From pop-up clinics to long-term community partnerships
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Viva Health coordinates medical outreaches, screenings, referrals, and education campaigns designed around the
          realities of the communities we serve. Each programme is built in collaboration with local leaders and health
          professionals.
        </p>
      </section>

      <ServicesSection />
      <VideoSection />
      <Footer />
    </main>
  );
};

export default WhatWeDo;
