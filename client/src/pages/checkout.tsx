import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Shield, Lock, CheckCircle2, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import type { CartItem, AddOn } from "@shared/schema";
import { addOns } from "@shared/data";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [step, setStep] = useState(1);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    country: "",
  });
  const { toast } = useToast();

  const orderMutation = useMutation({
    mutationFn: async (orderData: {
      email: string;
      password: string;
      cartItem: CartItem & { addOns?: AddOn[] };
      promoCode?: string;
      paymentDetails: {
        cardNumber: string;
        expiryDate: string;
        cvv: string;
        country: string;
      };
    }) => {
      return await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Order completed!",
          description: "Check your email for your license key and setup instructions.",
        });
        localStorage.removeItem("cart");
        setTimeout(() => {
          setLocation("/");
        }, 1500);
      } else {
        toast({
          title: "Order failed",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCartItem(parsed);
      } catch (e) {
        console.error("Failed to parse cart:", e);
        setLocation("/");
      }
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill in all fields",
        description: "Email and password are required.",
        variant: "destructive",
      });
      return;
    }
    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    setShowUpsellModal(true);
  };

  const handleUpsellContinue = () => {
    setShowUpsellModal(false);
    setStep(2);
  };

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.country) {
      toast({
        title: "Please fill in all fields",
        description: "All payment details are required.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      email: formData.email,
      password: formData.password,
      cartItem: {
        ...cartItem,
        addOns: selectedAddOns,
      },
      promoCode: cartItem.promoCode,
      paymentDetails: {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        country: formData.country,
      },
    };

    orderMutation.mutate(orderData);
  };

  if (!cartItem) {
    return null;
  }

  const basePrice = cartItem.price;
  const discount = cartItem.discount || 0;
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addon) =>
      sum + (cartItem.billingTerm === "monthly" ? addon.monthlyPrice : addon.yearlyPrice),
    0
  );
  const subtotal = basePrice + addOnsTotal;
  const discountAmount = basePrice * discount;
  const total = subtotal - discountAmount;

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40" data-testid="header-checkout">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SecureShield</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Step {step} of 2</span>
              <span className="text-sm text-muted-foreground">{progress}% complete</span>
            </div>
            <Progress value={progress} className="h-2" data-testid="progress-checkout" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="shadow-soft border-card-border" data-testid="card-step-1">
                <CardHeader>
                  <CardTitle>Create your account</CardTitle>
                  <CardDescription>
                    Enter your email and create a password to manage your subscription
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStep1Submit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Create password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="At least 8 characters"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                        minLength={8}
                        data-testid="input-password"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use at least 8 characters with a mix of letters and numbers
                      </p>
                    </div>

                    <Button type="submit" className="w-full" size="lg" data-testid="button-continue-step-1">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="shadow-soft border-card-border" data-testid="card-step-2">
                <CardHeader>
                  <CardTitle>Payment details</CardTitle>
                  <CardDescription>
                    Enter your payment information to complete your purchase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                        data-testid="input-card-number"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry date</Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                          data-testid="input-expiry-date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                          data-testid="input-cvv"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        required
                        data-testid="input-country"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                      <Lock className="h-4 w-4 flex-shrink-0" />
                      <span>Your payment is secure and encrypted with 256-bit SSL</span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={orderMutation.isPending}
                      data-testid="button-complete-purchase"
                      data-evt="checkout_complete"
                    >
                      {orderMutation.isPending ? "Processing..." : "Complete Purchase"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft border-card-border sticky top-24" data-testid="card-order-summary">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground">{cartItem.planName}</p>
                  <p className="text-sm text-muted-foreground">
                    {cartItem.billingTerm === "monthly" ? "Monthly" : "Yearly"} billing
                  </p>
                  <Badge className="mt-2 bg-primary/10 text-primary">
                    {cartItem.devices === 1 ? "1 device" : cartItem.devices === 10 ? "Up to 10 devices" : "Unlimited"}
                  </Badge>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">Add-ons:</p>
                    <ul className="space-y-2">
                      {selectedAddOns.map((addon) => (
                        <li key={addon.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{addon.name}</span>
                          <span className="text-foreground font-medium">
                            $
                            {(cartItem.billingTerm === "monthly"
                              ? addon.monthlyPrice
                              : addon.yearlyPrice
                            ).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium" data-testid="text-summary-subtotal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-primary font-medium" data-testid="text-summary-discount">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-baseline">
                      <span className="text-foreground font-semibold">Total</span>
                      <span className="text-2xl font-bold text-foreground" data-testid="text-summary-total">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    {cartItem.billingTerm === "yearly" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ${(total / 12).toFixed(2)}/month billed annually
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Instant download after purchase</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Upsell Modal */}
      <Dialog open={showUpsellModal} onOpenChange={setShowUpsellModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-upsell">
          <DialogHeader>
            <DialogTitle className="text-2xl">Maximize your protection</DialogTitle>
            <DialogDescription>
              Add these premium features to get complete security and privacy
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {addOns.map((addon) => {
              const isSelected = selectedAddOns.find((a) => a.id === addon.id);
              const price =
                cartItem.billingTerm === "monthly" ? addon.monthlyPrice : addon.yearlyPrice;

              return (
                <Card
                  key={addon.id}
                  className={`cursor-pointer transition-all ${
                    isSelected ? "ring-2 ring-primary bg-primary/5" : "hover-elevate"
                  }`}
                  onClick={() => toggleAddOn(addon)}
                  data-testid={`card-addon-${addon.id}`}
                  data-evt={isSelected ? "upsell_remove" : "upsell_accept"}
                  data-addon={addon.id}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={!!isSelected}
                        onCheckedChange={() => toggleAddOn(addon)}
                        className="mt-1"
                        data-testid={`checkbox-addon-${addon.id}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{addon.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {addon.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">${price.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              /{cartItem.billingTerm === "monthly" ? "month" : "year"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Total with add-ons</p>
              <p className="text-2xl font-bold text-foreground" data-testid="text-upsell-total">
                ${(basePrice + addOnsTotal - discountAmount).toFixed(2)}
              </p>
            </div>
            <Button onClick={handleUpsellContinue} size="lg" data-testid="button-upsell-continue">
              Continue to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
