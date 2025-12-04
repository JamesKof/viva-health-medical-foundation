import { Navbar } from "@/components/Navbar";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const Gallery = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Outreach Gallery"
        description="Photos from Viva Health Medical Foundation outreaches, screenings, and community initiatives across Ghana."
      />
      <Navbar />

      <section className="pt-32 pb-8 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">Gallery</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl">
          Faces, places, and stories from the field
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Explore snapshots from our medical outreaches, school visits, health fairs, and community engagements. Each
          image represents real people reached through the generosity of partners and volunteers.
        </p>
      </section>

      <GallerySection />
      <Footer />
    </main>
  );
};

export default Gallery;
