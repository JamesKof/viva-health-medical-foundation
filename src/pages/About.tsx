import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="About Viva Health"
        description="Learn about Viva Health Medical Foundation's mission, vision, and impact in underserved communities."
      />
      <Navbar />
      <AboutSection />
      <Footer />
    </main>
  );
};

export default About;
