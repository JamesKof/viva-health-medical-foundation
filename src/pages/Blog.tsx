import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { Calendar, User, ArrowRight, Mail, BookOpen } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { PageTransition, PageHero } from "@/components/PageTransition";
import outreach1 from "@/assets/blog/outreach-1.jpeg";
import accraGirls from "@/assets/blog/accra-girls.jpg";
import mentalHealth from "@/assets/blog/mental-health.png";
import surgeonPreparing from "@/assets/keta-outreach/surgeon-preparing.jpg";

const categories = ["All", "Outreach", "Stories", "Updates", "Health Tips"];

const blogPosts = [
  {
    image: outreach1,
    date: "Oct 14, 2024",
    author: "James",
    category: "Outreach",
    title: "Vivahealth Medical Foundation embarks on another outreach at Pupuni and Tortibo",
    excerpt: "Our team traveled to the rural communities of Pupuni and Tortibo to provide free medical screenings and health education to over 300 residents.",
    featured: true,
  },
  {
    image: accraGirls,
    date: "May 28, 2024",
    author: "Sarah",
    category: "Outreach",
    title: "Celebrating World Menstrual Hygiene Day at Accra Girls SHS",
    excerpt: "A special outreach dedicated to menstrual health education and providing sanitary supplies to students.",
    featured: false,
  },
  {
    image: mentalHealth,
    date: "Oct 10, 2024",
    author: "Dr. Mensah",
    category: "Health Tips",
    title: "Mental Health Awareness Month outreach at O'Reilly SHS",
    excerpt: "Breaking the stigma around mental health through education and open conversations with students.",
    featured: false,
  },
  {
    image: surgeonPreparing,
    date: "Nov 15, 2024",
    author: "Viva Health Team",
    category: "Stories",
    title: "Behind the Scenes: Preparing for the Keta Surgical Outreach",
    excerpt: "A look at the meticulous preparation that goes into organizing a successful surgical mission.",
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((post) => post !== featuredPost);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Stories & Updates"
          description="Stories, reflections, and impact updates from Viva Health Medical Foundation outreaches and programmes."
        />
        <Navbar />

        {/* Hero Section with Green Background */}
        <section className="pt-24 bg-primary">
          <div className="relative min-h-[60vh] flex items-end">
            <div className="absolute inset-0">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/80 to-primary" />
            </div>

            <div className="container mx-auto px-4 relative z-10 pb-16">
              <PageHero className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {featuredPost.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                </div>
              </PageHero>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <FadeInUp className="flex flex-wrap items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </FadeInUp>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <StaggerItem key={post.title}>
                  <article className="group bg-card rounded-2xl overflow-hidden shadow-soft card-lift border border-border/60 h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Newsletter Signup */}
        <FadeInUp>
          <section className="py-16 section-gradient">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Stay Updated on Our Impact
                </h2>
                <p className="text-muted-foreground mb-8">
                  Subscribe to receive stories, updates, and announcements about our outreaches and programmes.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
        </FadeInUp>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Blog;