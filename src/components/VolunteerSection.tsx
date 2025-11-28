import { Heart, HandCoins, Home, Megaphone, Users } from "lucide-react";

const volunteerOptions = [
  {
    icon: Users,
    title: "Volunteer",
    description: "Join our team of dedicated healthcare volunteers making a difference.",
  },
  {
    icon: HandCoins,
    title: "Cash Donation",
    description: "Your financial support directly funds medical screenings and medications.",
  },
  {
    icon: Home,
    title: "Accommodation Support",
    description: "Help provide lodging for our medical outreach teams in communities.",
  },
  {
    icon: Megaphone,
    title: "Publicity",
    description: "Help spread the word about our programs and reach more communities.",
  },
];

export const VolunteerSection = () => {
  return (
    <section id="volunteer" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
              <Heart className="w-4 h-4" />
              Want to Volunteer?
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Partner With Us
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We believe in the power of partnerships to drive positive change
              in healthcare. That's why we are always open to collaborating
              with like-minded organizations, businesses, and individuals who
              share our vision of improving healthcare access and quality for
              underserved communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Become a Volunteer
              </a>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {volunteerOptions.map((option, index) => (
              <div
                key={option.title}
                className="group bg-card rounded-2xl p-6 shadow-soft card-lift cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <option.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {option.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
