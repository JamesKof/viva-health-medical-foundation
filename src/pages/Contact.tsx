import { Mail, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Contact Viva Health"
        description="Get in touch with Viva Health Medical Foundation for partnerships, volunteering, or general enquiries."
      />
      <Navbar />

      <section className="pt-32 pb-16 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">Contact</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          We would love to hear from you
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Reach out to discuss partnerships, volunteer opportunities, sponsorships, or to learn more about our
          outreach programs across Ghana.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
            <Phone className="w-6 h-6 text-primary mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-1">Call Us</h2>
            <p className="text-muted-foreground text-sm">+233 53 083 9578</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
            <Mail className="w-6 h-6 text-primary mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-1">Email</h2>
            <p className="text-muted-foreground text-sm">info@vivahealthmedfoundation.org</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
            <MapPin className="w-6 h-6 text-primary mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-1">Location</h2>
            <p className="text-muted-foreground text-sm">Ghana, West Africa</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
