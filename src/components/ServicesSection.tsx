import {
  Activity,
  Smile,
  Pill,
  Stethoscope,
  CreditCard,
  Eye,
} from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Blood Pressure & Sugar Checks",
    description:
      "Monitoring key health indicators for early detection and prevention of chronic diseases.",
  },
  {
    icon: Smile,
    title: "Dental Screening & Procedures",
    description:
      "Comprehensive dental care ensuring a confident smile starts with good oral health.",
  },
  {
    icon: Pill,
    title: "Free Medication",
    description:
      "Providing free medication during outreach programs to ensure accessible healthcare for all.",
  },
  {
    icon: Stethoscope,
    title: "General Medical Consultations",
    description:
      "Professional diagnosis and guidance for individuals and families seeking quality healthcare.",
  },
  {
    icon: CreditCard,
    title: "Free NHIS Registration",
    description:
      "Partnering with National Health Insurance Scheme for free registration and renewal.",
  },
  {
    icon: Eye,
    title: "Eye Screening",
    description:
      "Essential vision care services for learning, working, and living safely.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
            Our Featured Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive healthcare services are designed to reach
            underserved communities and provide essential medical support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-2xl p-8 shadow-soft card-lift overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Read More Link */}
              <a
                href="#"
                className="relative inline-flex items-center gap-2 mt-4 text-primary font-medium text-sm hover:gap-3 transition-all"
              >
                Read More
                <span className="text-lg">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
