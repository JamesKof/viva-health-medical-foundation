import { useState } from "react";
import { X, Heart, CreditCard, Smartphone, Check, Loader2, Building2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const donationAmounts = [50, 100, 200, 500, 1000];

const BANK_DETAILS = {
  bankName: "Ecobank Ghana",
  accountName: "Viva Health Medical Foundation",
  accountNumber: "1234567890",
};

type PaymentMethod = "card" | "momo" | "bank";

export const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

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

    if ((paymentMethod === "momo" || paymentMethod === "card") && !phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "bank") {
      toast({
        title: "Bank Transfer",
        description: "Please use the bank details provided to make your transfer.",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);

    trackEvent("donation_flow_started", {
      paymentMethod,
      amount,
    });

    try {
      const clientReference = `viva_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

      const { data, error } = await supabase.functions.invoke("hubtel-initiate", {
        body: {
          totalAmount: amount,
          description: "Donation to Viva Health Medical Foundation",
          clientReference,
          email,
          donorName: name || "Anonymous",
          phone,
        },
      });

      if (error) {
        console.error("Hubtel initiate error:", error);
        throw error;
      }

      if (data?.checkoutUrl) {
        trackEvent("donation_checkout_opened", {
          paymentMethod,
          amount,
          clientReference,
        });
        setCheckoutUrl(data.checkoutUrl);
      } else {
        throw new Error("Failed to get checkout URL");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleCloseCheckout = () => {
    setCheckoutUrl(null);
    setIsLoading(false);
    trackEvent("donation_checkout_closed", { paymentMethod, amount });
  };

  const resetForm = () => {
    setSelectedAmount(100);
    setCustomAmount("");
    setEmail("");
    setName("");
    setPhone("");
    setIsLoading(false);
    setCheckoutUrl(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  // Show Hubtel checkout iframe
  if (checkoutUrl) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in p-4"
        onClick={handleCloseCheckout}
      >
        <div
          className="bg-card rounded-2xl shadow-lifted w-full max-w-lg overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Complete Your Donation</h3>
            <button
              onClick={handleCloseCheckout}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <iframe
            src={checkoutUrl}
            className="w-full h-[500px] border-0"
            title="Hubtel Checkout"
            allow="payment"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in p-4"
      onClick={handleClose}
    >
      <div
        className="bg-card rounded-3xl shadow-lifted max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-border">
          <button
            onClick={handleClose}
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
          {/* Amount Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Select Amount (GHS)</Label>
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
            <div className="grid grid-cols-3 gap-2">
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
                <span className="font-medium text-sm">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("bank")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "bank"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Building2 className="w-6 h-6 text-primary" />
                <span className="font-medium text-sm">Bank Transfer</span>
              </button>
            </div>
          </div>

          {/* Bank Details Section */}
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
                        toast({
                          title: "Copied!",
                          description: "Account number copied to clipboard.",
                        });
                      }}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                After making the transfer, please fill in your details below so we can acknowledge your donation.
              </p>
            </div>
          )}

          {/* Donor Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="modal-name" className="text-sm font-medium mb-2 block">
                Full Name (Optional)
              </Label>
              <Input
                id="modal-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="modal-email" className="text-sm font-medium mb-2 block">
                Email Address *
              </Label>
              <Input
                id="modal-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="modal-phone" className="text-sm font-medium mb-2 block">
                Phone Number *
              </Label>
              <Input
                id="modal-phone"
                type="tel"
                placeholder="e.g., 0241234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Summary */}
          {amount && amount > 0 && (
            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Donation Amount</span>
                <span className="font-semibold">GHS {amount}</span>
              </div>
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
            ) : paymentMethod === "bank" ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                I've Made the Transfer
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                Donate GHS {amount || 0}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secured by Hubtel. Your donation supports healthcare for underserved communities.
          </p>
        </div>
      </div>
    </div>
  );
};
