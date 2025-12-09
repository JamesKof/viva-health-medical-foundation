import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VolunteerSection } from "@/components/VolunteerSection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const Index = () => {
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
      <TestimonialsSection />
      <VolunteerSection />
      <BlogSection />
      <Footer />
      
      {/* Floating Donate Button */}
      <Link
        to="/donate"
        className="fixed bottom-6 right-6 z-40 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold shadow-lifted hover:scale-105 transition-transform animate-pulse"
      >
        Donate Now
      </Link>
    </main>
  );
};

export default Index;
