import { FormEvent, useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MemberOnboardingFormValues {
  fullName: string;
  gender: string;
  placeOfWork: string;
  volunteerCategory: string;
  contact: string;
  email: string;
  placeOfAbode: string;
}

const initialValues: MemberOnboardingFormValues = {
  fullName: "",
  gender: "",
  placeOfWork: "",
  volunteerCategory: "",
  contact: "",
  email: "",
  placeOfAbode: "",
};

const WHATSAPP_RAW_NUMBER = "0530839578";

const buildWhatsappNumber = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return `233${digits.slice(1)}`; // Ghana country code
  }
  return digits;
};

const buildWhatsappMessage = (values: MemberOnboardingFormValues) => {
  return [
    "New Viva Health volunteer sign-up",
    "",
    `Full Name: ${values.fullName}`,
    `Gender: ${values.gender}`,
    `Place of Work: ${values.placeOfWork}`,
    `Volunteer Category: ${values.volunteerCategory}`,
    `Primary Contact: ${values.contact}`,
    `Email: ${values.email}`,
    `Place of Abode: ${values.placeOfAbode}`,
  ].join("\n");
};

export const MemberOnboardingForm = () => {
  const [values, setValues] = useState<MemberOnboardingFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useAnalytics();
  const { toast } = useToast();

  const handleChange = (field: keyof MemberOnboardingFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): string | null => {
    if (!values.fullName.trim()) return "Please enter your full name.";
    if (!values.gender) return "Please select your gender.";
    if (!values.volunteerCategory) return "Please choose a volunteer category.";
    if (!values.contact.trim()) return "Please provide a phone number we can reach you on.";
    if (!/^\+?\d[\d\s-]{6,}$/.test(values.contact.trim()))
      return "Please enter a valid contact number.";
    if (!values.email.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      return "Please enter a valid email address.";
    if (!values.placeOfAbode.trim()) return "Please tell us where you live (town/city).";
    return null;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const errorMessage = validate();

    if (errorMessage) {
      toast({
        title: "Check your details",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const whatsappNumber = buildWhatsappNumber(WHATSAPP_RAW_NUMBER);
    const message = buildWhatsappMessage(values);
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    trackEvent("volunteer_onboarding_submitted", {
      volunteerCategory: values.volunteerCategory,
      gender: values.gender,
    });

    try {
      window.open(url, "_blank");
      toast({
        title: "Almost done!",
        description:
          "A WhatsApp window has opened with your details. Please review and send the message so our team can follow up.",
      });
      setValues(initialValues);
    } catch (error) {
      console.error("Failed to open WhatsApp", error);
      toast({
        title: "WhatsApp not available",
        description:
          "We couldn't open WhatsApp automatically on this device. Please contact us directly on WhatsApp at 0530839578.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase mb-2">
            Member Sign-up
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Share your details to join the Viva Health volunteer family
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete this short form and we&apos;ll receive your submission instantly via WhatsApp. A coordinator will follow
            up to welcome you and share next steps.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/60">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={values.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g., Ama Mensah"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={values.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Other">Other / Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="volunteerCategory">Volunteer Category *</Label>
              <Select
                value={values.volunteerCategory}
                onValueChange={(value) => handleChange("volunteerCategory", value)}
              >
                <SelectTrigger id="volunteerCategory">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Member Volunteer">Member Volunteer</SelectItem>
                  <SelectItem value="Non-member Volunteer">Non-member Volunteer</SelectItem>
                  <SelectItem value="Corporate / Partner">Corporate / Partner</SelectItem>
                  <SelectItem value="Student / Intern">Student / Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Primary Contact (Phone) *</Label>
              <Input
                id="contact"
                value={values.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                placeholder="e.g., 0530839578"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="e.g., ama.mensah@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeOfWork">Place of Work / Institution</Label>
            <Input
              id="placeOfWork"
              value={values.placeOfWork}
              onChange={(e) => handleChange("placeOfWork", e.target.value)}
              placeholder="e.g., Korle-Bu Teaching Hospital, KNUST, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeOfAbode">Place of Abode *</Label>
            <Input
              id="placeOfAbode"
              value={values.placeOfAbode}
              onChange={(e) => handleChange("placeOfAbode", e.target.value)}
              placeholder="Town / city (e.g., Adenta, Cape Coast)"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-border/60 mt-2">
            <p className="text-xs text-muted-foreground max-w-md">
              By submitting, you consent to Viva Health contacting you via WhatsApp, phone, or email about volunteer
              opportunities and member updates.
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full px-6"
            >
              {isSubmitting ? "Preparing WhatsApp..." : "Submit & open WhatsApp"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
