import { useState } from "react";
import { Heart, CreditCard, Smartphone, Building2, Copy, Check, Loader2, Calendar, Repeat, Users, Stethoscope, Pill } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PAYSTACK_CONFIG } from "@/config/paystack";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";
import heroImg from "@/assets/hero-community.jpeg";

const BANK_DETAILS = {
  bankName: "Ecobank Ghana",
  accountName: "Viva Health Medical Foundation",
  accountNumber: "1234567890",
};

const donationAmounts = [50, 100, 200, 500, 1000, 2000];

const impactStats = [
  { icon: Users, value: "10,000+", label: "Lives Touched" },
  { icon: Stethoscope, value: "50+", label: "Medical Outreaches" },
  { icon: Pill, value: "5,000+", label: "Free Medications" },
];

type DonationType = "one-time" | "recurring";
type PaymentMethod = "card" | "momo" | "bank";

const Donate = () => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleOneTimeDonation = async () => {
    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_CONFIG.publicKey,
      email: email,
      amount: amount! * 100,
      currency: "GHS",
      ref: `viva_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      metadata: {
        custom_fields: [
          { display_name: "Donor Name", variable_name: "donor_name", value: name || "Anonymous" },
          { display_name: "Donation Type", variable_name: "donation_type", value: "one-time" },
          { display_name: "Phone Number", variable_name: "phone", value: phone },
        ],
      },
      channels: paymentMethod === "momo" ? ["mobile_money"] : ["card"],
      callback: (response: any) => {
        trackEvent("donation_success_frontend", { type: "one-time", paymentMethod, amount, reference: response.reference });
        toast({ title: "Thank You!", description: `Your donation of GHS ${amount} was successful.` });
        resetForm();
      },
      onClose: () => {
        setIsLoading(false);
        trackEvent("donation_flow_closed", { type: "one-time", paymentMethod, amount });
      },
    });
    handler.openIframe();
  };

  const handleRecurringDonation = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("create-subscription", {
        body: { email, amount, name: name || "Anonymous", phone, interval: "monthly" },
      });

      if (error) throw error;

      if (data?.authorization_url) {
        trackEvent("donation_subscription_initiated", { type: "recurring", paymentMethod, amount });
        window.location.href = data.authorization_url;
      } else {
        throw new Error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({ title: "Error", description: "Failed to initialize subscription. Please try again.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  const handleDonate = async () => {
    if (!amount || amount < 1) {
      toast({ title: "Invalid Amount", description: "Please enter a valid donation amount.", variant: "destructive" });
      return;
    }

    if (!email) {
      toast({ title: "Email Required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }

    if (paymentMethod === "momo" && !phone) {
      toast({ title: "Phone Required", description: "Please enter your mobile money number.", variant: "destructive" });
      return;
    }

    if (paymentMethod === "bank") {
      toast({ title: "Bank Transfer", description: "Please use the bank details provided to make your transfer.", variant: "default" });
      return;
    }

    setIsLoading(true);
    trackEvent("donation_flow_started", { donationType, paymentMethod, amount });

    try {
      if (donationType === "recurring") {
        await handleRecurringDonation();
      } else {
        await handleOneTimeDonation();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to initialize payment. Please try again.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedAmount(100);
    setCustomAmount("");
    setEmail("");
    setName("");
    setPhone("");
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Donate to Viva Health Medical Foundation"
        description="Support free healthcare for underserved communities in Ghana. Donate via Mobile Money, Card, or Bank Transfer."
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Medical outreach" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground font-medium text-sm mb-6 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              Make a Difference
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Your Generosity Saves Lives
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
              Every donation directly funds free medical screenings, medications, and health education for communities that need it most.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {impactStats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Donation Form */}
          <div className="bg-card rounded-3xl p-8 shadow-lifted border border-border/60 sticky top-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary" />
              Make Your Donation
            </h2>

            <div className="space-y-6">
              {/* Donation Type */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Donation Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDonationType("one-time")}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                      donationType === "one-time" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium">One-Time</span>
                  </button>
                  <button
                    onClick={() => setDonationType("recurring")}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                      donationType === "recurring" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Repeat className="w-5 h-5 text-primary" />
                    <span className="font-medium">Monthly</span>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Select Amount (GHS) {donationType === "recurring" && <span className="text-muted-foreground font-normal">/ month</span>}
                </Label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {donationAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`p-3 rounded-xl border-2 transition-all font-medium ${
                        selectedAmount === amt && !customAmount ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">GHS</span>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    className="pl-14"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod("momo")}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "momo" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-primary" />
                    <span className="font-medium text-sm">Mobile Money</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-primary" />
                    <span className="font-medium text-sm">Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Building2 className="w-6 h-6 text-primary" />
                    <span className="font-medium text-sm">Bank</span>
                  </button>
                </div>
              </div>

              {/* Bank Details */}
              {paymentMethod === "bank" && (
                <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Bank Transfer Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Bank Name</span>
                      <span className="font-medium">{BANK_DETAILS.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Account Name</span>
                      <span className="font-medium">{BANK_DETAILS.accountName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium font-mono">{BANK_DETAILS.accountNumber}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
                            toast({ title: "Copied!", description: "Account number copied to clipboard." });
                          }}
                          className="p-1 hover:bg-secondary rounded"
                        >
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    After making the transfer, please fill in your details below so we can acknowledge your donation.
                  </p>
                </div>
              )}

              {/* Donor Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-2 block">Full Name (Optional)</Label>
                  <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                {paymentMethod === "momo" && (
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-2 block">Mobile Money Number *</Label>
                    <Input id="phone" type="tel" placeholder="e.g., 0241234567" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                )}
              </div>

              {/* Summary */}
              {amount && amount > 0 && (
                <div className="bg-primary/5 rounded-xl p-4 space-y-2 border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Donation Amount</span>
                    <span className="font-semibold text-lg">GHS {amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-semibold capitalize">{donationType === "recurring" ? "Monthly" : "One-time"}</span>
                  </div>
                  {donationType === "recurring" && (
                    <div className="flex justify-between items-center pt-2 border-t border-primary/20">
                      <span className="text-muted-foreground">Annual Impact</span>
                      <span className="font-semibold text-primary">GHS {amount * 12}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button onClick={handleDonate} disabled={isLoading || !amount} className="w-full py-6 rounded-xl text-lg font-semibold">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : paymentMethod === "bank" ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    I've Made the Transfer
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    {donationType === "recurring" ? `Subscribe GHS ${amount || 0}/month` : `Donate GHS ${amount || 0}`}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secured by Paystack. Your donation supports healthcare for underserved communities.
              </p>
            </div>
          </div>

          {/* Impact Stories */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Your Donation Helps</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your generosity enables us to bring essential healthcare services to communities that would otherwise go without.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">50</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">GHS 50</h3>
                    <p className="text-sm text-muted-foreground">Provides blood pressure and sugar screening for 5 individuals</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">100</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">GHS 100</h3>
                    <p className="text-sm text-muted-foreground">Covers medication costs for a family for one month</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">500</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">GHS 500</h3>
                    <p className="text-sm text-muted-foreground">Funds eye screening and glasses for 10 community members</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">1000+</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">GHS 1,000+</h3>
                    <p className="text-sm text-muted-foreground">Helps sponsor an entire community outreach event</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <blockquote className="text-lg italic text-foreground mb-4">
                "Thanks to Viva Health's outreach, I discovered I had high blood pressure. They provided free medication and now I'm managing it well. God bless the donors!"
              </blockquote>
              <p className="text-sm text-muted-foreground">— Beneficiary from Keta Outreach</p>
            </div>

            {/* Trust Badges */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Trusted payment methods</p>
              <div className="flex justify-center gap-6 opacity-60">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm font-medium">MTN MoMo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm font-medium">Vodafone Cash</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm font-medium">Visa/Mastercard</span>
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

export default Donate;
