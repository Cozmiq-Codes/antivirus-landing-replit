# SecureShield - Antivirus Ecommerce Landing Page

## Project Overview
A conversion-focused antivirus ecommerce landing page inspired by Asurion's friendly, rounded aesthetic with Avast's signature orange (#FF7800) branding. The application features a complete purchase funnel from landing page to checkout with strategic upsells.

## Project Structure

### Frontend Pages
- **Landing Page (/)**: Full marketing page with hero, features grid, pricing with billing toggle, comparison table, testimonials, FAQ accordion, and trust badges
- **Cart Page (/cart)**: Shopping cart with promo code functionality and order summary
- **Checkout Page (/checkout)**: Multi-step checkout with email/password creation, strategic upsell modal for add-ons, and payment form

### Key Features
1. **Sticky Header**: Scroll-triggered CTA button that becomes more prominent after scrolling
2. **Hero Section**: Large hero image with dark gradient overlay, dual CTAs (Buy Now + Try Free), and trust bar with OS icons
3. **Features Grid**: 6 rounded cards showcasing AI Anti-Scam, Malware Shield, Web/Email Protection, Smart Scan, Firewall, and Wi-Fi Security
4. **Pricing Section**: Monthly/Yearly billing toggle with 3 tiers (Free, Premium Security, Ultimate) and "Best Value" badge
5. **Comparison Table**: Feature matrix comparing all plans with checkmarks and clear visual hierarchy
6. **Testimonials**: Customer reviews with generated headshot images and star ratings
7. **FAQ Accordion**: Covers billing, device limits, refunds, installation, and support
8. **Cart Flow**: LocalStorage-based cart persistence connecting all "Buy Now" buttons
9. **Strategic Checkout**: Multi-step flow with upsell modal for VPN, Cleanup, and AntiTrack add-ons with live price updates
10. **Mobile Responsive**: Sticky bottom CTA on mobile, responsive grid layouts

## Design System

### Colors (Avast Orange + Asurion Style)
- **Primary**: #FF7800 (Avast Orange) - CTAs, highlights, price accents
- **Text**: #2D364C (Navy) - body copy, headings
- **Background**: #FFFFFF (White)
- **Muted**: #F7F7F9 (Light gray for alternating sections)
- **Accent**: #6534AC (Purple for badges)

### Typography
- **Font**: Inter (modern sans-serif)
- **Headings**: Bold, tight line-height (1.0-1.2)
- **Body**: Relaxed line-height (1.6+)

### Components
- **Cards**: White background, 12px border-radius, soft shadow (0 8px 20px rgba(0,0,0,0.08))
- **Buttons**: Rounded/pill-shaped, orange primary, subtle outline secondary
- **Spacing**: Generous white space with consistent padding (py-20 to py-24 for sections)

## Data Models

### Plans
- Free: 1 device, basic protection
- Premium Security: Up to 10 devices, full protection suite
- Ultimate: Unlimited devices, includes VPN, Cleanup, AntiTrack

### Add-ons (Checkout Upsell)
- SecureVPN: $2.99/month or $29.99/year
- PC Cleanup: $1.99/month or $19.99/year
- AntiTrack: $1.99/month or $19.99/year

### Cart Item Structure
```typescript
{
  planId: string
  planName: string
  tier: "free" | "premium" | "ultimate"
  billingTerm: "monthly" | "yearly"
  price: number
  devices: number
  addOns?: AddOn[]
  discount?: number (0-1 for percentage)
}
```

## Accessibility Features
- Skip-to-content link for keyboard navigation
- WCAG-AA contrast ratios throughout
- Semantic HTML5 (header, nav, main, section, footer)
- ARIA labels for star ratings, icon buttons, and modals
- Keyboard navigation support with visible focus rings
- Comprehensive data-testid attributes for testing

## Event Tracking
All CTAs and interactions include data attributes for analytics:
- `data-evt="cta_click"` - CTA button clicks
- `data-plan="[tier]"` - Which plan was selected
- `data-evt="upsell_accept"` - Upsell add-on accepted
- `data-addon="[addon-id]"` - Which add-on was selected
- `data-evt="checkout_complete"` - Purchase completed

## User Flows

### Purchase Flow
1. User clicks "Buy Now" on any plan → localStorage saves cart → navigates to /cart
2. Cart page shows plan summary, promo code input, order summary
3. "Proceed to Checkout" → navigates to /checkout
4. Step 1: Email + password creation
5. Upsell Modal: VPN, Cleanup, AntiTrack add-ons with live price updates
6. Step 2: Payment details (card, expiry, CVV, country)
7. Complete Purchase → thank you message → clears cart → returns to home

### Promo Code
- Code "SAVE10" gives 10% discount
- Applied in cart page, persisted through checkout

## Performance Optimizations
- Lazy-loaded images (hero and testimonials)
- Smooth scroll behavior for anchor links
- Sticky positioning for header and mobile CTA
- Optimized re-renders with proper React hooks
- CSS transitions for smooth interactions

## Recent Changes (November 5, 2025)
- Created complete frontend with Landing, Cart, and Checkout pages
- Implemented Avast orange (#FF7800) color scheme throughout
- Added generated lifestyle and headshot images
- Built 6-feature grid with rounded cards and icons
- Created pricing section with Monthly/Yearly toggle
- Implemented comparison table with 10 feature rows
- Added testimonials with 5-star ratings and customer photos
- Built FAQ accordion with 6 common questions
- Implemented cart with promo code functionality
- Created multi-step checkout with strategic upsell modal
- Added mobile sticky CTA and responsive layouts
- Configured design system tokens in tailwind.config.ts
