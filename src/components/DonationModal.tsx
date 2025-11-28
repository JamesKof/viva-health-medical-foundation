import { useState } from "react";
import { X, Heart, CreditCard, Smartphone, Check, Loader2, Calendar, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PAYSTACK_CONFIG } from "@/config/paystack";
import { supabase } from "@/integrations/supabase/client";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const donationAmounts = [50, 100, 200, 500, 1000];

type DonationType = "one-time" | "recurring";
type PaymentMethod = "card" | "momo";

export const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const { toast } = useToast();
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
    // Initialize Paystack payment for one-time donation
    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_CONFIG.publicKey,
      email: email,
      amount: amount! * 100, // Paystack expects amount in pesewas/kobo
      currency: "GHS",
      ref: `viva_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: name || "Anonymous",
          },
          {
            display_name: "Donation Type",
            variable_name: "donation_type",
            value: "one-time",
          },
          {
            display_name: "Phone Number",
            variable_name: "phone",
            value: phone,
          },
        ],
      },
      channels: paymentMethod === "momo" ? ["mobile_money"] : ["card"],
      callback: (response: any) => {
        toast({
          title: "Thank You!",
          description: `Your donation of GHS ${amount} was successful. Reference: ${response.reference}`,
        });
        onClose();
        resetForm();
      },
      onClose: () => {
        setIsLoading(false);
      },
    });

    handler.openIframe();
  };

  const handleRecurringDonation = async () => {
    try {
      // Call our edge function to create a subscription
      const { data, error } = await supabase.functions.invoke("create-subscription", {
        body: {
          email,
          amount,
          name: name || "Anonymous",
          phone,
          interval: "monthly",
        },
      });

      if (error) {
        throw error;
      }

      if (data?.authorization_url) {
        // Redirect to Paystack checkout page for subscription
        window.location.href = data.authorization_url;
      } else {
        throw new Error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize subscription. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleDonate = async () => {
    if (!amount || amount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "momo" && !phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your mobile money number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (donationType === "recurring") {
        await handleRecurringDonation();
      } else {
        await handleOneTimeDonation();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-3xl shadow-lifted max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Make a Donation</h2>
              <p className="text-sm text-muted-foreground">Support our healthcare mission</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Donation Type Toggle */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Donation Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDonationType("one-time")}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  donationType === "one-time"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">One-Time</span>
              </button>
              <button
                onClick={() => setDonationType("recurring")}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  donationType === "recurring"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Repeat className="w-5 h-5 text-primary" />
                <span className="font-medium">Monthly</span>
              </button>
            </div>
            {donationType === "recurring" && (
              <p className="text-xs text-muted-foreground mt-2 bg-secondary/50 p-2 rounded-lg">
                Monthly donations are automatically charged on the same day each month. You can cancel anytime.
              </p>
            )}
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
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`p-3 rounded-xl border-2 transition-all font-medium ${
                    selectedAmount === amt && !customAmount
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50"
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
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="pl-14"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMethod("momo")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "momo"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Smartphone className="w-6 h-6 text-primary" />
                <span className="font-medium text-sm">Mobile Money</span>
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <CreditCard className="w-6 h-6 text-primary" />
                <span className="font-medium text-sm">Card Payment</span>
              </button>
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                Full Name (Optional)
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {paymentMethod === "momo" && (
              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                  Mobile Money Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., 0241234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          {/* Summary */}
          {amount && amount > 0 && (
            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Donation Amount</span>
                <span className="font-semibold">GHS {amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Frequency</span>
                <span className="font-semibold capitalize">
                  {donationType === "recurring" ? "Monthly" : "One-time"}
                </span>
              </div>
              {donationType === "recurring" && (
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-muted-foreground">Annual Impact</span>
                  <span className="font-semibold text-primary">GHS {amount * 12}</span>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleDonate}
            disabled={isLoading || !amount}
            className="w-full py-6 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                {donationType === "recurring" 
                  ? `Subscribe GHS ${amount || 0}/month` 
                  : `Donate GHS ${amount || 0}`
                }
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secured by Paystack. Your donation supports healthcare for underserved communities.
            {donationType === "recurring" && " Cancel your subscription anytime."}
          </p>
        </div>
      </div>
    </div>
  );
};
