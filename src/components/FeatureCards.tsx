import { HandHeart, BookOpen, MessageCircle } from "lucide-react";

const features = [
  {
    icon: HandHeart,
    title: "Get Involved",
    description:
      "Volunteer or donate to support our life-changing programs and make a difference in communities.",
  },
  {
    icon: BookOpen,
    title: "Explore Our Programs",
    description:
      "Browse through our healthcare programs and support one of your choice to help those in need.",
  },
  {
    icon: MessageCircle,
    title: "Contact Us Today",
    description:
      "Reach out with any inquiries about our services and how you can partner with us.",
  },
];

export const FeatureCards = () => {
  return (
    <section className="relative -mt-24 z-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 shadow-soft card-lift cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div className="mt-6 h-1 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
