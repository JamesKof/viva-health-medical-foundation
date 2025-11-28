import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "My daughter received free medical screening and treatment for malaria through Viva Health Medical Foundation's school outreach program. Without this support, many families like mine would not be able to access such care. They are truly giving our children a healthier future.",
    name: "Auntie Lizzy",
    role: "Beneficiary Parent",
  },
  {
    quote:
      "As a corporate partner, we are proud to support Viva Health Medical Foundation. Their accountability, transparency, and measurable impact make every cedi worth donating. We have seen how our contributions directly fund free medical screenings, medications, and health education programs that transform lives.",
    name: "Dr. Dzokoto",
    role: "Corporate Donor",
  },
  {
    quote:
      "I chose to support Viva Health Medical Foundation because their work goes beyond providing medicine—they give people hope. Knowing that my donation helps a mother get prenatal care or a child receive life-saving treatment is deeply fulfilling.",
    name: "Passion Air",
    role: "Partner Organization",
  },
  {
    quote:
      "I had been struggling with untreated hypertension for years because I couldn't afford regular checkups. During Viva Health's free medical outreach in my community, I was diagnosed, given medication, and connected to ongoing care. Today, my health has greatly improved.",
    name: "Enyonam",
    role: "Community Member",
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Beneficiaries Have to Say
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Quote className="w-16 h-16 text-primary-foreground/20" />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Testimonial Content */}
          <div className="text-center px-8 md:px-16">
            <p className="text-xl md:text-2xl leading-relaxed mb-8 opacity-90">
              "{testimonials[activeIndex].quote}"
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold mb-4">
                {testimonials[activeIndex].name.charAt(0)}
              </div>
              <h4 className="text-xl font-semibold">
                {testimonials[activeIndex].name}
              </h4>
              <p className="text-primary-foreground/70">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-primary-foreground"
                    : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
