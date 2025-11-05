import type { Plan, AddOn } from "./schema";

export const plans: Plan[] = [
  {
    id: "free",
    tier: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    devices: 1,
    features: [
      "Essential antivirus protection",
      "Basic web protection",
      "Smart Scan for quick checkups",
      "Manual virus removal",
    ],
  },
  {
    id: "premium",
    tier: "premium",
    name: "Premium Security",
    monthlyPrice: 4.99,
    yearlyPrice: 49.99,
    devices: 10,
    features: [
      "Everything in Free",
      "AI-powered anti-scam guidance",
      "Real-time malware & ransomware shield",
      "Web & email shield with anti-phishing",
      "Advanced firewall protection",
      "Wi-Fi security check",
      "Automatic updates & real-time protection",
      "Priority support",
    ],
  },
  {
    id: "ultimate",
    tier: "ultimate",
    name: "Ultimate",
    monthlyPrice: 7.99,
    yearlyPrice: 79.99,
    devices: 10,
    isBestValue: true,
    features: [
      "Everything in Premium Security",
      "Secure VPN for privacy",
      "PC Cleanup & optimization",
      "AntiTrack for browsing privacy",
      "Unlimited device coverage",
      "Premium priority support",
    ],
  },
];

export const addOns: AddOn[] = [
  {
    id: "vpn",
    name: "SecureVPN",
    description: "Encrypt your connection and browse privately on any network",
    monthlyPrice: 2.99,
    yearlyPrice: 29.99,
  },
  {
    id: "cleanup",
    name: "PC Cleanup",
    description: "Remove junk files and optimize your computer's performance",
    monthlyPrice: 1.99,
    yearlyPrice: 19.99,
  },
  {
    id: "antitrack",
    name: "AntiTrack",
    description: "Block online trackers and protect your browsing privacy",
    monthlyPrice: 1.99,
    yearlyPrice: 19.99,
  },
];

export const comparisonFeatures = [
  { name: "AI-powered anti-scam guidance", free: false, premium: true, ultimate: true },
  { name: "Real-time malware & ransomware shield", free: false, premium: true, ultimate: true },
  { name: "Advanced firewall protection", free: false, premium: true, ultimate: true },
  { name: "Web & email shield with anti-phishing", free: false, premium: true, ultimate: true },
  { name: "Wi-Fi security check", free: false, premium: true, ultimate: true },
  { name: "Secure VPN for privacy", free: false, premium: false, ultimate: true },
  { name: "PC Cleanup & optimization", free: false, premium: false, ultimate: true },
  { name: "AntiTrack for browsing privacy", free: false, premium: false, ultimate: true },
  { name: "Device coverage", free: "1 device", premium: "Up to 10 devices", ultimate: "Unlimited" },
  { name: "Support", free: "Community", premium: "Priority", ultimate: "Premium Priority" },
];

export const faqs = [
  {
    question: "How does billing work?",
    answer: "You'll be charged based on your selected billing term (monthly or yearly). Your subscription automatically renews unless you cancel. You can cancel anytime from your account settings.",
  },
  {
    question: "How many devices can I protect?",
    answer: "Free protects 1 device. Premium Security covers up to 10 devices. Ultimate offers unlimited device coverage for your entire household.",
  },
  {
    question: "What's your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied, contact support within 30 days of purchase for a full refund.",
  },
  {
    question: "How do I install the software?",
    answer: "After purchase, you'll receive an email with your license key and download link. Simply download the installer, run it, and enter your license key when prompted.",
  },
  {
    question: "Can I cancel or change my subscription?",
    answer: "Yes! You can cancel anytime from your account dashboard. To upgrade or downgrade, contact our support team who will help you adjust your plan.",
  },
  {
    question: "What are your support hours?",
    answer: "Premium and Ultimate users get priority support via email and live chat, available 24/7. Free users have access to our community forums and knowledge base.",
  },
];

export const testimonials = [
  {
    name: "Michael R.",
    location: "Austin, TX",
    rating: 5,
    text: "SecureShield caught a phishing email that looked totally legitimate. The AI guidance explained exactly why it was suspicious. Best investment for my family's safety!",
    image: "testimonial_1",
  },
  {
    name: "Sarah L.",
    location: "Seattle, WA",
    rating: 5,
    text: "I love the Wi-Fi security check feature. It alerted me that my home network wasn't properly secured. Super easy to use and gives me peace of mind.",
    image: "testimonial_2",
  },
  {
    name: "Jennifer M.",
    location: "Boston, MA",
    rating: 5,
    text: "The real-time protection is fantastic. It works quietly in the background and I never have to worry. The 30-day guarantee made it risk-free to try.",
    image: "testimonial_3",
  },
];
