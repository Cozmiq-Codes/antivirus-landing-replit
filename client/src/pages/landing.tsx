import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Shield, Brain, Lock, Zap, Network, Wifi, Download, Search, CheckCircle2, Star, Check, X, ChevronDown, Monitor, Smartphone, Apple, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@assets/generated_images/Hero_woman_working_laptop_f2d928aa.png";
import testimonial1 from "@assets/generated_images/Testimonial_headshot_man_b7ebb016.png";
import testimonial2 from "@assets/generated_images/Testimonial_headshot_woman_one_857021b3.png";
import testimonial3 from "@assets/generated_images/Testimonial_headshot_woman_two_174a11db.png";
import { plans, comparisonFeatures, faqs, testimonials } from "@shared/data";
import type { BillingTerm } from "@shared/schema";

const testimonialImages = {
  testimonial_1: testimonial1,
  testimonial_2: testimonial2,
  testimonial_3: testimonial3,
};

export default function Landing() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [billingTerm, setBillingTerm] = useState<BillingTerm>("yearly");
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setShowMobileCTA(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleBuyNow = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      const price = billingTerm === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
      const cartItem = {
        planId: plan.id,
        planName: plan.name,
        tier: plan.tier,
        billingTerm,
        price,
        devices: plan.devices,
      };
      localStorage.setItem("cart", JSON.stringify(cartItem));
      setLocation("/cart");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        data-testid="link-skip-to-content"
      >
        Skip to content
      </a>

      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
        data-testid="header-main"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SecureShield</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="link-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="link-pricing"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("compare")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="link-compare"
              >
                Compare
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="link-reviews"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="link-faq"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("footer")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="link-support"
              >
                Support
              </button>
            </nav>

            <Button
              onClick={() => scrollToSection("pricing")}
              className={`transition-all ${isScrolled ? "opacity-100" : "opacity-0 md:opacity-100"}`}
              data-testid="button-buy-now-header"
              data-evt="cta_click"
              data-plan="header"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background" data-testid="section-hero">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Woman working securely on laptop"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                All-in-one protection for every device.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                AI-powered anti-scam guidance, real-time malware and ransomware defense, safer browsing & email, and Wi-Fi security you can trust.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("pricing")}
                  className="w-full sm:w-auto text-base px-8"
                  data-testid="button-buy-now-hero"
                  data-evt="cta_click"
                  data-plan="hero"
                >
                  Buy Now — 30-day money-back guarantee
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleBuyNow("free")}
                  className="w-full sm:w-auto text-base px-8"
                  data-testid="button-try-free-hero"
                  data-evt="cta_click"
                  data-plan="free"
                >
                  Try Free
                </Button>
              </div>

              {/* Trust Bar */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <Apple className="h-5 w-5 text-muted-foreground" />
                  <Chrome className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Trusted by millions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">Award-winning protection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 sm:py-24 bg-background" data-testid="section-features">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Complete protection for your digital life
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced security features that work together to keep you safe online
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI Anti-Scam Guidance",
                  description: "Spot scams fast with AI guidance that explains why suspicious emails and websites are dangerous.",
                },
                {
                  icon: Shield,
                  title: "Malware & Ransomware Shield",
                  description: "Stop ransomware before it strikes with real-time malware detection and automatic threat removal.",
                },
                {
                  icon: Lock,
                  title: "Web & Email Shield",
                  description: "Block malicious sites and phishing emails before they can harm your device or steal your data.",
                },
                {
                  icon: Zap,
                  title: "Smart Scan",
                  description: "Quick, intelligent scans that find threats without slowing down your computer.",
                },
                {
                  icon: Network,
                  title: "Firewall Protection",
                  description: "Control remote access and protect your network from unauthorized intrusions.",
                },
                {
                  icon: Wifi,
                  title: "Wi-Fi Security Check",
                  description: "Secure your home Wi-Fi network and get alerts about potential vulnerabilities.",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-card-border shadow-soft hover-elevate" data-testid={`card-feature-${index}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-24 bg-muted/30" data-testid="section-how-it-works">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Get protected in 3 simple steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {[
                {
                  icon: Download,
                  step: "1",
                  title: "Download",
                  description: "Get your personalized installer and license key instantly after purchase.",
                },
                {
                  icon: Search,
                  step: "2",
                  title: "Smart Scan",
                  description: "Run your first scan to identify and remove any existing threats on your device.",
                },
                {
                  icon: CheckCircle2,
                  step: "3",
                  title: "Stay Protected",
                  description: "Enjoy automatic updates and real-time shields that work silently in the background.",
                },
              ].map((step, index) => (
                <div key={index} className="text-center" data-testid={`step-${index}`}>
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center shadow-soft-lg">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 left-1/2 ml-6 w-8 h-8 rounded-full flex items-center justify-center bg-background text-foreground border-2 border-primary font-bold">
                      {step.step}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 sm:py-24 bg-background" data-testid="section-pricing">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Choose your protection plan
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                30-day money-back guarantee on all paid plans
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-3 p-1 bg-muted rounded-full" data-testid="billing-toggle">
                <button
                  onClick={() => setBillingTerm("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingTerm === "monthly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="button-billing-monthly"
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingTerm("yearly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingTerm === "yearly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="button-billing-yearly"
                >
                  Yearly <Badge className="ml-2 bg-primary/10 text-primary">Save 17%</Badge>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const price = billingTerm === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
                const pricePerMonth = billingTerm === "yearly" ? (plan.yearlyPrice / 12).toFixed(2) : price.toFixed(2);

                return (
                  <Card
                    key={plan.id}
                    className={`relative border-card-border shadow-soft ${
                      plan.isBestValue ? "ring-2 ring-primary" : ""
                    }`}
                    data-testid={`card-plan-${plan.tier}`}
                  >
                    {plan.isBestValue && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        Best Value
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-foreground">
                            ${pricePerMonth}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {billingTerm === "yearly" && plan.yearlyPrice > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            ${plan.yearlyPrice}/year billed annually
                          </p>
                        )}
                      </div>
                      <CardDescription className="mt-2">
                        {plan.devices === 1 ? "1 device" : plan.devices === 10 ? "Up to 10 devices" : "Unlimited devices"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                      <Button
                        className="w-full"
                        variant={plan.tier === "free" ? "outline" : "default"}
                        onClick={() => handleBuyNow(plan.id)}
                        data-testid={`button-buy-${plan.tier}`}
                        data-evt="cta_click"
                        data-plan={plan.tier}
                      >
                        {plan.tier === "free" ? "Get Started" : "Buy Now"}
                      </Button>
                      {plan.tier !== "free" && (
                        <p className="text-xs text-center text-muted-foreground">
                          Auto-renews. Cancel anytime.
                        </p>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="compare" className="py-20 sm:py-24 bg-muted/30" data-testid="section-compare">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Compare all features
              </h2>
            </div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse" data-testid="table-comparison">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-bold text-foreground">Feature</th>
                    <th className="text-center p-4 font-bold text-foreground">Free</th>
                    <th className="text-center p-4 font-bold text-foreground">Premium</th>
                    <th className="text-center p-4 font-bold text-foreground relative">
                      Ultimate
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs">
                        Best Value
                      </Badge>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/50" data-testid={`row-feature-${index}`}>
                      <td className="p-4 text-foreground font-medium">{feature.name}</td>
                      <td className="p-4 text-center">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-muted-foreground">{feature.free}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.premium === "boolean" ? (
                          feature.premium ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-muted-foreground">{feature.premium}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.ultimate === "boolean" ? (
                          feature.ultimate ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-muted-foreground">{feature.ultimate}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="py-20 sm:py-24 bg-background" data-testid="section-reviews">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Trusted by millions worldwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-card-border shadow-soft" data-testid={`card-testimonial-${index}`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonialImages[testimonial.image as keyof typeof testimonialImages]}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-24 bg-muted/30" data-testid="section-faq">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Frequently asked questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible data-testid="accordion-faq">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`button-faq-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed" data-testid={`text-faq-answer-${index}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-background border-y border-border" data-testid="section-trust-badges">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">30-Day Money-Back</p>
                  <p className="text-sm text-muted-foreground">Risk-free guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Secure Checkout</p>
                  <p className="text-sm text-muted-foreground">256-bit encryption</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">All Platforms</p>
                  <p className="text-sm text-muted-foreground">Windows, Mac, iOS, Android</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Cancel Anytime</p>
                  <p className="text-sm text-muted-foreground">Auto-renew control</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-card py-16 border-t border-card-border" data-testid="footer-main">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection("features")} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-features">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("pricing")} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("compare")} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-compare">
                    Compare Plans
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-support">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                    Contact Us
                  </a>
                </li>
                <li>
                  <button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter" data-testid="link-footer-twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn" data-testid="link-footer-linkedin">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook" data-testid="link-footer-facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-card-border text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">SecureShield</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SecureShield. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      {showMobileCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg md:hidden">
          <Button
            className="w-full"
            onClick={() => scrollToSection("pricing")}
            data-testid="button-mobile-sticky-cta"
            data-evt="cta_click"
            data-plan="mobile-sticky"
          >
            Get Protected Now
          </Button>
        </div>
      )}
    </div>
  );
}
