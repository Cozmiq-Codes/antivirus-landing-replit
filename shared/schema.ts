import { z } from "zod";

// Plans and Pricing
export const planTiers = ["free", "premium", "ultimate"] as const;
export type PlanTier = typeof planTiers[number];

export const billingTerms = ["monthly", "yearly"] as const;
export type BillingTerm = typeof billingTerms[number];

export interface Plan {
  id: string;
  tier: PlanTier;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  devices: number;
  features: string[];
  isBestValue?: boolean;
}

// Add-ons for checkout upsell
export interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

// Cart item
export interface CartItem {
  planId: string;
  planName: string;
  tier: PlanTier;
  billingTerm: BillingTerm;
  price: number;
  devices: number;
  addOns?: AddOn[];
}

// Order
export interface Order {
  id: string;
  email: string;
  cartItem: CartItem;
  promoCode?: string;
  discount: number;
  subtotal: number;
  total: number;
  createdAt: string;
}

// Schemas for validation
export const cartItemSchema = z.object({
  planId: z.string(),
  planName: z.string(),
  tier: z.enum(planTiers),
  billingTerm: z.enum(billingTerms),
  price: z.number(),
  devices: z.number(),
  addOns: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    monthlyPrice: z.number(),
    yearlyPrice: z.number(),
  })).optional(),
});

export const createOrderSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  cartItem: cartItemSchema,
  promoCode: z.string().optional(),
  paymentDetails: z.object({
    cardNumber: z.string().min(13, "Invalid card number"),
    expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
    cvv: z.string().min(3, "Invalid CVV"),
    country: z.string().min(2, "Please select a country"),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const promoCodeSchema = z.object({
  code: z.string().min(1, "Please enter a promo code"),
});

export type PromoCodeInput = z.infer<typeof promoCodeSchema>;
