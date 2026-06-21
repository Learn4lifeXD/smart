---
name: Sovereign Tier
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bfc9bf'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#89938a'
  outline-variant: '#3f4942'
  surface-tint: '#88d7a6'
  primary: '#88d7a6'
  on-primary: '#003920'
  primary-container: '#006039'
  on-primary-container: '#88d8a7'
  inverse-primary: '#176c43'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#545353'
  on-tertiary-container: '#c9c7c6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a3f4c1'
  primary-fixed-dim: '#88d7a6'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#005230'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 40px
  gutter: 24px
  section-gap: 64px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style
The brand personality is authoritative, discreet, and exceptionally high-end. It balances the institutional gravity of government expropriation with the refined precision of wealth management. The target audience is senior officials and enterprise stakeholders who require a sense of absolute security and prestige.

The design style is **High-End Dark-Mode Glassmorphism**. It utilizes a "Succession-style" aesthetic: heavy on dark, expensive-looking surfaces, fine lines, and moments of high-contrast "Champagne Gold" light. Surfaces are not solid; they are multi-layered obsidian panels with subtle backdrop blurs that suggest depth and complexity without sacrificing professional clarity.

## Colors
The palette is rooted in an **Obsidian/Charcoal** base to provide a void-like depth. 
- **Rolex Forest Green (#006039)** is used sparingly for primary actions and status indicators, representing growth and institutional permanence.
- **Champagne Gold (#D4AF37)** is the signature accent, used for high-level data points, borders of active states, and "Premium" indicators.
- **Neutral Scales** are strictly cool-toned to maintain the "Rolex" feel, moving from a deep #0F0F0F base to #2A2A2A for elevated panels.

## Typography
The typography system uses **Outfit** for headlines to provide a modern, geometric, and expensive feel. The wide apertures and clean lines evoke high-end tech. **Inter** is used for all functional body and UI text, ensuring maximum legibility in data-dense dossier views. Labels are frequently uppercase with increased letter-spacing to mimic luxury brand architectural signage.

## Layout & Spacing
The layout follows a **Fixed-Width Executive Grid** on desktop (1440px) to maintain a cinematic, controlled composition. On mobile, it collapses to a single-column fluid flow with increased vertical padding to maintain the sense of "breathing room."

Spacing is generous. We use a 12-column grid with wide 24px gutters. Margin and padding are "airy," avoiding the cramped feel of traditional government software. Large dossier headers use 64px of bottom spacing to create a sense of importance before the data begins.

## Elevation & Depth
Depth is achieved through **Tonal Glassmorphism**:
1.  **Level 0 (Base):** Deep Obsidian (#0F0F0F).
2.  **Level 1 (Panels):** Translucent Charcoal (#1A1A1A at 80% opacity) with a 20px backdrop blur.
3.  **Level 2 (Active Cards):** Same as Level 1, but with a 0.5px "Champagne Gold" stroke at 30% opacity and a subtle gold outer glow (5px blur, 2% opacity).

Shadows are not black; they are "Atmospheric Shadows"—large, soft blurs with a faint tint of Forest Green to ground the elements.

## Shapes
The design system uses **Soft (0.25rem)** corners. This keeps the aesthetic sharp, architectural, and "masculine," avoiding the playfulness of fully rounded corners while still feeling contemporary. Larger containers (Dossier Cards) use `rounded-lg` (0.5rem) to slightly soften the massive data panels.

## Components
- **Buttons:** Primary buttons use a solid Forest Green fill with a slight Gold top-border highlight. Secondary buttons are "Ghost" style with a 1px Champagne Gold border and no fill.
- **Dossier Cards:** Large, translucent panels. Headers within cards should feature a subtle horizontal gradient line that fades from Champagne Gold to transparent.
- **Status Chips:** Instead of bright colors, use small, glowing "LED" dots. A pulsing Emerald dot for "Active," a steady Gold dot for "Pending."
- **Input Fields:** Bottom-border only or very thin 0.5px outlines. The focus state should illuminate the border in Gold with a 2px outer glow.
- **3D Elements:** Backgrounds should feature abstract, high-fidelity 3D ribbons or topographical meshes in dark glass materials with Gold light refractions to signify "Property/Land."
- **Lists:** Data rows should have a hover state that slightly increases the backdrop blur and adds a faint Forest Green left-border accent.