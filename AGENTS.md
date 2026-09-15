# AGENTS.md — Anchor Nikhil Gupta Website

This file acts as the persistent development instruction guide for all AI agents and developers working on this project. Every instruction and rule defined here must be strictly respected across all tasks.

---

## 1. PROJECT OVERVIEW

This is the official website for:

**Nikhil Gupta**  
Professional Event Anchor / Host / Emcee

The website is a premium personal-brand website for an event anchor who hosts weddings, social events, corporate events, college events, award ceremonies, musical events, and other live events.

The website should communicate:
- **Energy**
- **Personality**
- **Entertainment**
- **Professionalism**
- **Trust**
- **Experience**
- **Creativity**
- **Premium event-hosting capability**

The website should NOT feel like a generic corporate template, SaaS website, portfolio template, or overly formal business website. It should feel like a premium event personality's digital presence.

---

## 2. TECH STACK

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (Strict type safety)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (`@base-ui/react` primitives) where appropriate
- **Animations**: Motion (`motion`)
- **Icons**: Lucide React (`lucide-react`)
- **Forms**: React Hook Form (`react-hook-form`)
- **Validation**: Zod (`zod`, `@hookform/resolvers`)
- **Linting & Formatting**: ESLint, Prettier (`prettier-plugin-tailwindcss`)
- **Package Manager**: npm

Rules:
- Use Server Components by default.
- Only use `"use client"` when client-side interactivity is actually required.
- Avoid unnecessary dependencies or heavy third-party plugins.
- Do NOT use deprecated Next.js patterns.

---

## 3. PROJECT ARCHITECTURE

Keep the project modular, maintainable, and scalable:

```text
src/
├── app/                  # Next.js App Router routes and pages
│   ├── layout.tsx        # Root layout with fonts, metadata, providers
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles, Tailwind imports, CSS variables
│   ├── about/            # About page
│   ├── events/           # Events directory & category showcases
│   ├── gallery/          # Categorized image galleries
│   ├── videos/           # Video hub & reels
│   ├── testimonials/     # Video testimonials & WhatsApp feedback
│   ├── contact/          # Contact page
│   └── book-now/         # Primary booking conversion flow
│
├── components/
│   ├── layout/           # Navbar, Footer, Mobile Navigation, Floating CTA
│   ├── sections/         # Composable section components (Hero, Stats, etc.)
│   └── ui/               # shadcn/ui and reusable primitive UI components
│
├── data/                 # Structured static datasets (events, testimonials, FAQs, gallery items)
├── lib/                  # Utilities (cn, helpers, analytics, validation schemas)
└── types/                # TypeScript interfaces and type definitions

public/
├── images/               # Large event photography, portraits, category thumbnails
├── videos/               # Video reels (9:16 vertical), highlight clips
└── icons/                # Brand assets and custom icons
```

---

## 4. DESIGN DIRECTION

The website will eventually feature:
- Home
- About
- Events
- Gallery
- Videos / Reels
- Testimonials
- FAQ
- Contact
- Book Now

The visual language must be consistent throughout the entire site. Use supplied reference images as inspiration when available, but never directly duplicate another website's design.

Important design principles:
- **Strong visual hierarchy**: Clear typography scale, bold headings, legible body copy.
- **Premium typography**: Elegant font pairings with high readability.
- **High-quality imagery**: Large event photography showcasing Nikhil in action.
- **Controlled animations**: Subtle entrance transitions, smooth reveals, reduced motion support.
- **Generous & intentional spacing**: Let sections breathe without feeling sparse.
- **Strong CTA hierarchy**: Primary conversion ("BOOK NOW") visually stands out everywhere.
- **Consistent styling**: Uniform border radii, cohesive color palette, unified spacing scale.
- **Avoid anti-patterns**:
  - NO excessive card grids or unnecessary nested boxes.
  - NO generic template-like layouts or bootstrap-like grids.
  - NO aggressive, muddy, or unrefined gradients.
  - NO gratuitous, distracting animations.
  - NO visual clutter.

The final experience must feel like a world-class live event host's digital stage.

---

## 4.1 ESTABLISHED VISUAL DESIGN SYSTEM

### Color Tokens
- **Brand Burgundy**: Deep royal wine red (`#7E1926` / `--burgundy`). Primary background for high-impact visual areas, primary CTA buttons (**Book Me**), and section hero brushstrokes.
- **Burgundy Section**: Deep dark wine red (`#6B1221` / `--burgundy-section`) for the About Me / What I Do background continuation block.
- **Warm Champagne Gold**: Restrained luxury accent (`#D4AF37` / `--gold`). Used for subtle flourishes, quote underlines, and badge highlights.
- **Warm Ivory / Off-White**: Soft editorial background (`#FDFCF9` / `--background`) for clean left-hand editorial areas, navigation, and readability.
- **Section Theming**:
  - Hero uses clean editorial ivory on the left transitioning into a dynamic burgundy brush splash on the right.
  - Section continuation uses `.bg-burgundy-section` for the subsequent About / Services block.

### Typography System
- **Display / Heading Family**: `Playfair Display` (`--font-display` / `.font-display`), editorial luxury serif with red-carpet presence.
- **Body & UI Family**: `Plus Jakarta Sans` (`--font-sans` / `.font-sans`), crisp, energetic modern sans-serif with high readability.
- **Scale**:
  - `Display`: `text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display tracking-tight`
  - `H1`: `text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight`
  - `H2`: `text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight`
  - `H3`: `text-2xl sm:text-3xl font-display font-semibold`
  - `H4`: `text-xl sm:text-2xl font-sans font-semibold`
  - `Body Large`: `text-lg sm:text-xl font-sans leading-relaxed`
  - `Body`: `text-base font-sans leading-relaxed`
  - `Body Small`: `text-sm font-sans leading-normal text-muted-foreground`
  - `Caption`: `text-xs font-sans uppercase tracking-widest font-semibold`
  - `Button / Nav`: `text-sm sm:text-base font-sans font-semibold tracking-wider uppercase`

### Button Hierarchy (`src/components/ui/button.tsx`)
- **Primary Conversion CTA (`variant="bookNow"`)**: Warm gold fill, dark navy text, subtle gold glow, hover elevation. Reserved for "BOOK NOW" conversion targets.
- **Navy Button (`variant="navy"`)**: Deep navy background with crisp off-white text.
- **Gold Outline (`variant="goldOutline"`)**: Thin gold border with gold text, fills on hover. Ideal for supporting CTAs on navy sections ("WATCH REELS", "VIEW GALLERY").
- **Secondary (`variant="secondary"`)**: Soft ivory background with dark navy text.
- **Outline (`variant="outline"`)**: Hairline border matching the active section theme.
- **Sizes**: `xs`, `sm`, `default`, `lg`, `xl` (hero & banner CTA), `icon`.

### Card & Media Primitives (`src/components/ui/card.tsx`)
- Cards must remain media-first without excessive nested boxes or heavy dark shadows.
- Use `border border-border/70 bg-card text-card-foreground`.
- Standard media aspect ratios:
  - Vertical Reels: `aspect-[9/16]`
  - Highlight Videos: `aspect-video` (16:9)
  - Event Photography / Category Covers: `aspect-[4/5]`, `aspect-[3/4]`, or `aspect-square`
- Gradient overlays on images: Use `.media-overlay-gradient` (`bg-gradient-to-t from-black/85 via-black/30 to-transparent`) solely when text overlays require legibility.

### Animation Tokens (`src/lib/animations.ts`)
- Use Motion with standard cinematic cubic bezier curve: `[0.22, 1, 0.36, 1]`.
- Pre-built variants: `fadeIn`, `fadeInUp`, `scaleIn`, `staggerContainer`, `cardHover`.
- Always respect `prefers-reduced-motion` using `getAccessibleVariant()`.

---

## 5. RESPONSIVE DESIGN

Every component must be designed and verified responsively:
- **Desktop** (1280px+)
- **Laptop** (1024px – 1279px)
- **Tablet** (768px – 1023px)
- **Mobile** (320px – 767px)

Rules:
- Do not simply scale down desktop layouts for mobile screens.
- Build deliberate, mobile-first adaptations where appropriate.
- Pay special attention to:
  - Navbar (clean mobile drawer / hamburger menu)
  - Hero section (headline scaling, touch-friendly CTAs)
  - Image galleries (touch swipe, responsive grids)
  - Reels (full vertical 9:16 experience on mobile)
  - Statistics (stacked or compact grid counters)
  - Testimonials (smooth touch carousels)
  - FAQ (accessible accordion interaction)
  - Forms (accessible input sizing, proper virtual keyboard types)
  - Footer & Floating contact / WhatsApp buttons

---

## 6. COMPONENT ARCHITECTURE

- **No Monolithic Pages**: Do NOT create single giant page components. Break everything down into focused, reusable components.
- **Separation of Concerns**: Keep content and data strictly separated from presentation logic.
  - Store event categories, FAQs, testimonials, gallery metadata, and stats in `src/data/`.
  - Pass structured data into presentation components via typed props.
- **Avoid Duplication**: Standardize buttons, badges, section headings, media cards, and modals.

---

## 7. PLANNED WEBSITE CONTENT

The website will showcase events organized into three main categories:

### Wedding Events:
- Engagement Ceremony
- Haldi Carnival
- Sangeet Night
- Varmala
- Baraat on Wheels
- Reception Party
- Pool Party
- Cocktail Party
- Bachelor's Party
- After Party

### Special Occasions:
- Anniversary
- Baby Shower
- Birthday Party
- Kitty Party
- Retirement Party
- Band Night
- New Year Party
- Festival

### Corporate & Commercial:
- Store Opening / Launch
- Annual Events
- Corporate Meeting
- Awards
- Sports
- School / College Fest
- Make-up Workshops
- Government Events

*(Note: Do not build these sections until their respective implementation phases.)*

---

## 8. PLANNED MEDIA SECTIONS

1. **Gallery**:
   - Filterable/organized by event category.
   - Clicking an event/category reveals associated photographs.
   - Separate Posters / Other category.
   - Lightbox view for full-resolution inspection.

2. **Reels**:
   - Instagram-inspired vertical video presentation.
   - 9:16 aspect ratio.
   - Auto-muted playback by default with intuitive sound toggle.
   - Scroll/swipe interaction optimized for mobile and desktop.

3. **Testimonials**:
   - Video testimonials from clients and event organizers.
   - WhatsApp feedback screenshots presented cleanly.

4. **Videos**:
   - Event highlight videos.
   - Stage games & crowd interactions.
   - Showreels and anchor intros.

---

## 9. PLANNED NAVIGATION

Primary navigation structure:
- Home
- About
- Events (with category dropdown / drawer)
- Gallery
- Videos
- Testimonials (Testimonial Videos & WhatsApp Feedback)
- Contact Us
- **BOOK NOW** (Primary high-visibility CTA)

---

## 10. PLANNED STATS SECTION

Credibility and statistics section featuring animated counters:
- Metrics inspired by supplied content (e.g., 20K+, 18+, 6K+, 11K+, 37+, 26+).
- Exact labels and metrics to be confirmed from source project documents.
- Must feature smooth counting animations upon scrolling into view rather than static numbers.

---

## 11. CONTENT RULES & SOURCE OF TRUTH

- The supplied client document is the absolute source of truth for all content.
- **Never invent** facts, achievements, clients, locations, awards, statistics, testimonials, or credentials.
- If content appears ambiguous or contradictory in the source material, do not guess or silently choose one version — flag the discrepancy for confirmation.
- Copy may be polished or paraphrased for tone when requested, while strictly preserving factual accuracy.

---

## 12. CONTACT / BOOKING

- Contact Us page & dedicated Book Now conversion page.
- Date/availability checking inquiry form.
- Direct WhatsApp instant chat integration.
- Keep contact and booking systems modular and easy to extend.
- Do not hardcode placeholder contact details (phone numbers, emails) until verified client credentials are provided.

---

## 13. SEO & METADATA

- Page-specific titles, descriptions, and Open Graph / Twitter cards.
- Proper semantic HTML headings (`<h1>` through `<h6>`).
- `robots.txt` and dynamic `sitemap.xml`.
- Structured data (JSON-LD) for Person, Event, and LocalBusiness schema.
- Meaningful `alt` text on all images.
- Clean, search-engine-friendly URLs.

---

## 14. PERFORMANCE

Because this site is heavily media-driven:
- Use `next/image` with optimized dimensions, formats (AVIF/WebP), and appropriate `priority` or `loading="lazy"`.
- Avoid loading massive raw video files simultaneously; stream or lazy-load video previews.
- Ensure reels do not autoplay multiple audio/video streams simultaneously.
- Keep JavaScript bundle size small; minimize client-side dependencies.
- Leverage Server Components for zero-bundle data rendering.

---

## 15. ACCESSIBILITY (a11y)

- Semantic HTML tags (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`).
- Keyboard navigation and visible focus rings.
- Appropriate ARIA attributes when custom interactive widgets are necessary.
- High color contrast meeting WCAG AA standards.
- Respect `prefers-reduced-motion` media queries for animations.

---

## 16. CODE QUALITY

- Strict TypeScript: no `any` types unless truly unavoidable.
- No dead code, unused imports, or stray `console.log` statements.
- Modular styling via Tailwind utility classes; extract shared styles into components rather than repeating long class strings across files.
- Consistent formatting via Prettier and lint validation via ESLint.

---

## 17. ANTIGRAVITY WORKFLOW

When developing features:
1. Inspect existing code before writing or modifying anything.
2. Understand current architectural patterns and conventions.
3. Make atomic, minimal, and appropriate changes.
4. Verify both `npm run dev` and `npm run build` after changes.
5. Visually inspect responsive behavior across desktop and mobile.
6. Fix any issues immediately before completing a task.
7. Never wipe out working code or build monolithic single-file pages.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
