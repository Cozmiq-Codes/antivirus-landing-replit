import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Shield, Trash2, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { CartItem } from "@shared/schema";
import { plans } from "@shared/data";

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const promoMutation = useMutation({
    mutationFn: async (code: string) => {
      return await apiRequest("POST", "/api/promo-code/validate", { code });
    },
    onSuccess: (data) => {
      if (data.valid) {
        setDiscount(data.discount);
        toast({
          title: "Promo code applied!",
          description: data.message,
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to validate promo code. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItem(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, []);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast({
        title: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }
    promoMutation.mutate(promoCode);
  };

  const handleRemoveItem = () => {
    setCartItem(null);
    localStorage.removeItem("cart");
  };

  const handleProceedToCheckout = () => {
    if (cartItem) {
      localStorage.setItem("cart", JSON.stringify({ ...cartItem, discount, promoCode: discount > 0 ? promoCode : undefined }));
      setLocation("/checkout");
    }
  };

  const subtotal = cartItem?.price || 0;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  if (!cartItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-soft">
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription>Add a protection plan to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} data-testid="button-back-to-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40" data-testid="header-cart">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SecureShield</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              data-testid="button-back-to-shopping"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-soft border-card-border" data-testid="card-cart-item">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{cartItem.planName}</CardTitle>
                    <CardDescription className="mt-1">
                      {cartItem.devices === 1 ? "1 device" : cartItem.devices === 10 ? "Up to 10 devices" : "Unlimited devices"}
                    </CardDescription>
                    <Badge className="mt-2 bg-primary/10 text-primary">
                      {cartItem.billingTerm === "monthly" ? "Monthly" : "Yearly"} billing
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveItem}
                    data-testid="button-remove-item"
                  >
                    <Trash2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground">
                      {cartItem.billingTerm === "yearly" ? "Annual subscription" : "Monthly subscription"}
                    </span>
                    <span className="text-2xl font-bold text-foreground" data-testid="text-price">
                      ${cartItem.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Plan Features Preview */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-3">Included features:</p>
                    <ul className="space-y-2">
                      {plans
                        .find((p) => p.id === cartItem.planId)
                        ?.features.slice(0, 4)
                        .map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="shadow-soft border-card-border" data-testid="card-promo">
                <CardHeader>
                  <CardTitle className="text-lg">Have a promo code?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label htmlFor="promo-code" className="sr-only">
                        Promo code
                      </Label>
                      <Input
                        id="promo-code"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoMutation.isPending}
                        data-testid="input-promo-code"
                      />
                    </div>
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      disabled={promoMutation.isPending}
                      data-testid="button-apply-promo"
                    >
                      {promoMutation.isPending ? "Checking..." : "Apply"}
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-primary mt-2">
                      ✓ Promo code applied - {(discount * 100).toFixed(0)}% off
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft border-card-border sticky top-24" data-testid="card-summary">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium" data-testid="text-subtotal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span className="text-primary font-medium" data-testid="text-discount">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-baseline">
                      <span className="text-foreground font-semibold">Total</span>
                      <span className="text-2xl font-bold text-foreground" data-testid="text-total">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    {cartItem.billingTerm === "yearly" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ${(total / 12).toFixed(2)}/month billed annually
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleProceedToCheckout}
                    data-testid="button-proceed-checkout"
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="flex items-center gap-2 justify-center pt-4 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
