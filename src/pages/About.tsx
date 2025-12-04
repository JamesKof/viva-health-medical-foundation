import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="About Viva Health"
        description="Discover the story, mission, and values of Viva Health Medical Foundation and our commitment to underserved communities."
      />
      <Navbar />

      <section className="pt-32 pb-12 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">About Us</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl">
          A movement for dignified, community-centered healthcare
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Viva Health Medical Foundation brings together clinicians, volunteers, partners, and communities to deliver
          compassionate, practical healthcare where it is needed most. We believe every person deserves respectful,
          high-quality care regardless of location or income.
        </p>
      </section>

      <AboutSection />
      <Footer />
    </main>
  );
};

export default About;
