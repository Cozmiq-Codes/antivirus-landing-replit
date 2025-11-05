# Design Guidelines: Antivirus Ecommerce Landing Page

## Design Approach
**Reference-Based**: Asurion's friendly, trust-first aesthetic with Avast's orange branding (#FF7800). Generous white space, rounded cards, human-centric lifestyle photography, clean grid layouts.

## Color System
- **Primary (Brand Orange)**: `#FF7800` - CTAs, highlights, progress bars, price accents
- **Text (Navy)**: `#2D364C` - body copy, headings (strong contrast)
- **Background**: `#FFFFFF` - base canvas
- **Section Background**: `#F7F7F9` - subtle variation for alternating sections
- **Accent (Purple)**: `#6534AC` - badges, limited use only

## Typography
- **Font Family**: Inter or system-UI (modern sans-serif)
- **Headings**: Large scale (clamp-based H1), tight line-height (1.0-1.2), bold weights
- **Body**: 1.6+ line-height for readability
- **Hierarchy**: Clear distinction between H1/H2/H3/body

## Spacing System
Use Tailwind units: **4, 6, 8, 12, 16, 20** for consistent vertical/horizontal rhythm. Generous section padding (py-16 to py-24).

## Component Library

### Cards
- White background with rounded corners (12-16px radius)
- Soft shadow: `0 8px 20px rgba(0,0,0,0.08)`
- Icon at top, concise heading + short description
- Adequate internal padding for breathing room

### Buttons
- **Primary**: Pill/rounded, solid orange (#FF7800), white text, medium padding
- **Secondary**: Outline style, subtle border
- **CTA Text**: "Buy Now — 30-day money-back guarantee" (trust messaging)
- Hover states with slight scale/shadow increase

### Header (Sticky)
- Logo left, navigation links right (Features, Pricing, Compare, Reviews, FAQ, Support)
- "Buy Now" CTA button appears/emphasizes on scroll
- Clean, minimal design with subtle shadow on scroll

### Pricing Cards
- Three tiers displayed side-by-side (desktop), stacked (mobile)
- "Best Value" badge on Ultimate tier
- Bullet benefits list, prominent pricing, device count
- Orange "Buy Now" button
- Small print: auto-renew disclaimer, 30-day guarantee seal

### Comparison Table
- Clean grid: Free vs Premium vs Ultimate columns
- 8+ feature rows with checkmarks (✓) and dashes (—)
- Header row with plan names and "Best Value" badge
- Responsive: collapses to accordion on mobile

### Forms (Cart/Checkout)
- Inline validation with clear error states
- Generous input padding, rounded corners
- Progress indicator for multi-step checkout
- Promo code input with apply button
- Live price updates on quantity/add-on changes

## Layout Structure

### Hero Section
- **Image**: Large lifestyle photo showing person with laptop/devices, protection theme
- H1 centered over image with semi-transparent dark overlay for text legibility
- Dual CTAs: Primary (Buy Now) + Secondary (Try Free)
- Trust bar below: OS icons + "Trusted by millions" + "Award-winning protection"

### Features Grid
- 6 cards in 3-column layout (desktop), 2-column (tablet), 1-column (mobile)
- Icons at card top, benefit-focused headlines
- Features: AI Anti-Scam, Malware Shield, Web/Email Protection, Smart Scan, Firewall, Wi-Fi Security

### How It Works
- 3 steps horizontal layout with numbered badges
- Download → Smart Scan → Stay Protected
- Simple icons, brief descriptions

### Testimonials
- 3-5 cards with star ratings (★★★★★)
- Customer photo, quote, first name + city
- Device/lifestyle context images

### FAQ
- Accordion pattern (collapse/expand)
- Topics: Billing, device limits, 30-day refund, installation, cancel/renew, support

### Trust Badges
- Horizontal row of icons/seals: Money-back guarantee, Secure checkout, OS compatibility, Privacy pledge
- Subtle styling, not overpowering

### Footer
- Multi-column layout: Features, Pricing, Support, Legal links
- Social media icons
- Copyright text

## Images

### Hero Image
Large, high-quality lifestyle photography showing person using laptop with security visual metaphor (shield, lock icons). Warm, friendly tone. 1920x800px minimum. Semi-transparent overlay (#2D364C at 40% opacity) for text readability.

### Feature Section
Icon-based (no photos), use modern line-style icons from Heroicons or Font Awesome.

### Testimonial Cards
Small circular customer photos (80x80px), authentic feel. Optional: device/lifestyle context photos as card backgrounds (subtle, low opacity).

### Trust Section
Badge/seal graphics for guarantees and certifications.

## Interactions & Behavior
- Sticky header CTA highlights on scroll
- Pricing toggle (Monthly/Yearly) with smooth transition
- Smooth scroll to anchor links
- Upsell modal in checkout with instant price updates
- Mobile: sticky bottom CTA bar
- No excessive animations—focus on performance

## Accessibility
- WCAG-AA contrast ratios (orange #FF7800 passes on white)
- Skip-to-content link
- Semantic HTML5 (header, nav, main, section, footer)
- ARIA labels for star ratings, icon buttons, modals
- Keyboard navigation with visible focus rings
- Form labels and error announcements

## Performance
- Lazy-load images below fold
- Prefetch cart.html and checkout.html
- Defer non-critical JavaScript
- Optimize/compress images
- Reserve image space (prevent CLS)

## Event Tracking
Add data-attributes: `data-evt="cta_click" data-plan="premium"`, `data-evt="upsell_accept" data-addon="vpn"`, `data-evt="checkout_complete"`