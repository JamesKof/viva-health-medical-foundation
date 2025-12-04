import { Navbar } from "@/components/Navbar";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const Blog = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Stories & Updates"
        description="Read stories, news, and impact updates from Viva Health Medical Foundation."
      />
      <Navbar />
      <BlogSection />
      <Footer />
    </main>
  );
};

export default Blog;
