import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Heart, Users, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";
import heroCommunity from "@/assets/hero-community.jpeg";
import outreach1 from "@/assets/blog/outreach-1.jpeg";
import accraGirls from "@/assets/blog/accra-girls.jpg";

const slides = [
  {
    image: heroCommunity,
    badge: "Non-Profit Healthcare Organization",
    headline: "Bringing Quality",
    highlight: "Healthcare",
    subheadline: "to Every Community",
    description: "Empowering lives through medical outreach, free screenings, and accessible health education for all. Together, we create a healthier future.",
  },
  {
    image: outreach1,
    badge: "Community Medical Outreach",
    headline: "Free Medical",
    highlight: "Screenings",
    subheadline: "for All Communities",
    description: "We provide free blood pressure checks, dental screenings, eye tests, and general health consultations to underserved communities across Ghana.",
  },
  {
    image: accraGirls,
    badge: "Join Our Mission",
    headline: "Volunteer &",
    highlight: "Make Impact",
    subheadline: "in Someone's Life",
    description: "Be part of a movement that brings healthcare to those who need it most. Your time and support can transform lives and communities.",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleManualNavigation = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`${slide.headline} ${slide.highlight}`}
            className="w-full h-full object-cover scale-110"
          />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 hero-gradient" />
          {/* Soft Motion Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      ))}

      {/* Floating Elements for Depth */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-primary/5 blur-xl float" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            key={`badge-${currentSlide}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up"
          >
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/90">
              {slides[currentSlide].badge}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            key={`headline-${currentSlide}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up"
          >
            {slides[currentSlide].headline}
            <span className="block text-accent">{slides[currentSlide].highlight}</span>
            {slides[currentSlide].subheadline}
          </h1>

          {/* Subheadline */}
          <p
            key={`desc-${currentSlide}`}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up"
          >
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
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
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up">
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

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={() => {
            prevSlide();
            handleManualNavigation((currentSlide - 1 + slides.length) % slides.length);
          }}
          className="p-2 rounded-full glass text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-accent w-8"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            nextSlide();
            handleManualNavigation((currentSlide + 1) % slides.length);
          }}
          className="p-2 rounded-full glass text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
