import { Calendar, User, ArrowRight } from "lucide-react";
import outreach1 from "@/assets/blog/outreach-1.jpeg";
import accraGirls from "@/assets/blog/accra-girls.jpg";
import mentalHealth from "@/assets/blog/mental-health.png";

const blogPosts = [
  {
    image: outreach1,
    date: "Oct 14, 2025",
    author: "James",
    category: "Outreach",
    title: "Vivahealth Medical Foundation embarks on another outreach at Pupuni and Tortibo",
  },
  {
    image: accraGirls,
    date: "Oct 14, 2025",
    author: "James",
    category: "Outreach",
    title: "Vivahealth medical foundation celebrates world menstrual hygiene day at Accra Girls SHS",
  },
  {
    image: mentalHealth,
    date: "Oct 14, 2025",
    author: "James",
    category: "Outreach",
    title: "Vivahealth Medical Foundation marks Mental Health Awareness Month with outreach at O'Reilly SHS",
  },
];

export const BlogSection = () => {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
            Featured Blog
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Checkout Our Blog
          </h2>
          <p className="text-lg text-muted-foreground">
            Our campaigns are geared towards creating awareness, advocating for
            policy change, and empowering individuals to access quality
            healthcare.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <article
              key={post.title}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft card-lift"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
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

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Read More */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
