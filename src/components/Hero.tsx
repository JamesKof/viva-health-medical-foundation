import { ArrowRight, Heart, Users, Stethoscope } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Viva Health Medical Foundation community outreach"
          className="w-full h-full object-cover scale-110"
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 hero-gradient" />
        {/* Soft Motion Blur Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating Elements for Depth */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-primary/5 blur-xl float" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Non-Profit Healthcare Organization
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Bringing Quality
            <span className="block text-accent">Healthcare</span>
            to Every Community
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Empowering lives through medical outreach, free screenings, and
            accessible health education for all. Together, we create a healthier
            future.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#volunteer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg transition-all duration-300 hover:shadow-lifted hover:scale-105"
            >
              Get Involved
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-primary-foreground font-semibold text-lg transition-all duration-300 hover:bg-primary-foreground/10"
            >
              Our Programs
            </a>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="glass rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                6+
              </div>
              <div className="text-sm text-primary-foreground/70">
                Years Impacting
              </div>
            </div>
            <div className="glass rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-center mb-2">
                <Stethoscope className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                1000+
              </div>
              <div className="text-sm text-primary-foreground/70">
                Lives Touched
              </div>
            </div>
            <div className="glass rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                50+
              </div>
              <div className="text-sm text-primary-foreground/70">
                Volunteers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
