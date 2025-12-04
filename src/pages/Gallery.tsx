import { Navbar } from "@/components/Navbar";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const Gallery = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Outreach Gallery"
        description="Explore photos from Viva Health Medical Foundation outreaches, screenings, and community programs."
      />
      <Navbar />
      <GallerySection />
      <Footer />
    </main>
  );
};

export default Gallery;
