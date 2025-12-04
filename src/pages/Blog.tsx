import { Navbar } from "@/components/Navbar";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const Blog = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Stories & Updates"
        description="Stories, reflections, and impact updates from Viva Health Medical Foundation outreaches and programmes."
      />
      <Navbar />

      <section className="pt-32 pb-8 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">Stories</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl">
          Voices from patients, volunteers, and partners
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Read reflections from the field, patient stories, and behind-the-scenes notes from Viva Health outreaches and
          collaborations.
        </p>
      </section>

      <BlogSection />
      <Footer />
    </main>
  );
};

export default Blog;
