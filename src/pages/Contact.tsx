import { useState } from "react";
import { Mail, MapPin, Phone, Send, Facebook, Instagram } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Facebook, href: "https://web.facebook.com/profile.php?id=100075519322801", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/vivahealth_medical_foundation/", label: "Instagram" },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link
    const mailtoLink = `mailto:info@vivahealthmedfoundation.org?subject=${encodeURIComponent(
      formData.subject || "Website Inquiry"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client",
      description: "Your email client should open shortly. If not, please email us directly.",
    });

    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Contact Viva Health Medical Foundation"
        description="Get in touch with Viva Health Medical Foundation for partnerships, volunteering, sponsorships, or general enquiries. Located in Accra, Ghana."
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
              <Mail className="w-4 h-4" />
              Get In Touch
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Let&apos;s Explore How We Can Work Together
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Reach out to discuss community outreaches, corporate partnerships, volunteer opportunities, sponsorships, or
              media enquiries. Our team will be glad to connect with you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60 text-center card-lift">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Call Us</h2>
            <a href="tel:+233530839578" className="text-muted-foreground hover:text-primary transition-colors">
              +233 53 083 9578
            </a>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60 text-center card-lift">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Email Us</h2>
            <a href="mailto:info@vivahealthmedfoundation.org" className="text-muted-foreground hover:text-primary transition-colors break-all">
              info@vivahealthmedfoundation.org
            </a>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60 text-center card-lift">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Office Address</h2>
            <p className="text-muted-foreground">
              Accra, Greater Accra Region<br />Ghana
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 shadow-soft border border-border/60">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm font-medium mb-2 block">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 rounded-xl text-lg font-semibold"
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Social & Additional Info */}
          <div className="space-y-8">
            {/* Social Media */}
            <div className="bg-card rounded-3xl p-8 shadow-soft border border-border/60">
              <h2 className="text-2xl font-bold text-foreground mb-6">Connect With Us</h2>
              <p className="text-muted-foreground mb-6">
                Follow us on social media to stay updated on our latest outreaches, events, and community impact stories.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all group"
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-3">Quick Response via WhatsApp</h3>
              <p className="text-muted-foreground mb-6">
                Need a faster response? Send us a WhatsApp message and we'll get back to you promptly.
              </p>
              <a
                href="https://wa.me/233530839578"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-glow hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Office Hours */}
            <div className="bg-card rounded-3xl p-8 shadow-soft border border-border/60">
              <h3 className="text-xl font-bold text-foreground mb-4">Office Hours</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-foreground">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-foreground">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-foreground">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
