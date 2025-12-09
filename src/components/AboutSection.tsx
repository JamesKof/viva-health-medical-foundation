import { Target, Eye, Users } from "lucide-react";
import groupImg from "@/assets/hero-community.jpeg";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-lifted">
              <img
                src={groupImg}
                alt="Viva Health Foundation Team"
                className="w-full h-[500px] object-cover"
              />
              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 glass-strong rounded-2xl p-4">
                <div className="text-3xl font-bold text-primary">6+</div>
                <div className="text-sm text-foreground/70">
                  Years Impacting
                  <br />
                  Communities
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
              <Users className="w-4 h-4" />
              Who We Are
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              We are{" "}
              <span className="text-primary">Viva Health Medical Foundation</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Viva Health Medical Foundation is a non-profit organization
              dedicated to improving healthcare access and quality for
              underserved communities. We believe every individual deserves
              access to quality healthcare, regardless of their socioeconomic
              status or geographic location.
            </p>

            {/* Vision & Mission Cards */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-4 p-4 rounded-xl bg-card shadow-soft card-lift">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Our Vision
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    To create a world where every individual has access to
                    quality healthcare, regardless of their background.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-card shadow-soft card-lift">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Our Mission
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Empowering lives through medical outreach, free screenings,
                    and accessible health education for all.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
