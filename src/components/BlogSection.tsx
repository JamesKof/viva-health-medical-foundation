import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export const BlogSection = () => {
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="block">
              <article className="group bg-card rounded-2xl overflow-hidden shadow-soft card-lift">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">{post.category}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                    <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link">
                    Read More <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
