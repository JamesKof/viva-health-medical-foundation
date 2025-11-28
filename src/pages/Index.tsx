import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { VideoSection } from "@/components/VideoSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VolunteerSection } from "@/components/VolunteerSection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeatureCards />
      <AboutSection />
      <ServicesSection />
      <VideoSection />
      <TestimonialsSection />
      <VolunteerSection />
      <BlogSection />
      <Footer />
    </main>
  );
};

export default Index;
