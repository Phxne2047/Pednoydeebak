---
name: Ignite Operations
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#e0c0b1'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#a78b7d'
  outline-variant: '#584237'
  surface-tint: '#ffb690'
  primary: '#ffb690'
  on-primary: '#552100'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#9d4300'
  secondary: '#ffb4ab'
  on-secondary: '#690005'
  secondary-container: '#bb0112'
  on-secondary-container: '#ffc8c1'
  tertiary: '#93ccff'
  on-tertiary: '#003351'
  tertiary-container: '#00a2f4'
  on-tertiary-container: '#003554'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000b'
  tertiary-fixed: '#cde5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004b74'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
  status-warning: '#F59E0B'
  status-success: '#10B981'
  surface-elevated: '#27272A'
  surface-stroke: '#3F3F46'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
  container-max: 1440px
---

## Brand & Style

The design system for this enterprise-grade Smart Kitchen Operating System is built for the high-intensity, mission-critical environment of a professional kitchen. It evokes a sense of **urgency, precision, and relentless efficiency.** The brand personality is "The Pro-Chef's Co-Pilot"—authoritative and hyper-alert, yet sophisticated enough for executive-level analytics.

The design style is **Corporate / Modern** with a **High-Contrast** edge. It utilizes a dark mode foundation to minimize eye strain in varied lighting conditions, combined with aggressive color accents that demand immediate action. The interface focuses on high information density and "glanceability," ensuring that staff can process complex order states and AI recommendations in seconds. 

Key attributes:
- **Fast-paced:** Motion and transitions are snappy; information is tiered for rapid scanning.
- **High-Contrast:** Clear separation between background, surfaces, and critical status indicators.
- **Professional SaaS:** Structured, predictable layouts that prioritize utility over decoration.

## Colors

The palette is anchored by a **Dark Charcoal (#18181B)** background, creating a low-glare environment essential for high-heat, high-stress kitchen settings. 

- **Primary (Energetic Orange):** Used for primary actions, active navigation states, and highlighting the "active" workflow.
- **Secondary (Deep Red):** Reserved strictly for alerts, bottlenecks, and "Fail" states in the QC Gate Guard.
- **Status Colors:** We maintain a standard semantic set including **Warning Yellow (#F59E0B)** for moderate delays and **Success Emerald (#10B981)** for completed tasks and "Pass" results.
- **Neutrals:** Surfaces are built using a tiered slate system. Base layers use the darkest value, while "cards" and modals use **Surface Elevated (#27272A)** with a subtle **Surface Stroke (#3F3F46)** to define boundaries without heavy shadows.

## Typography

This design system utilizes **Inter** for all primary UI elements to ensure maximum legibility and a modern, neutral feel. For technical data, table numbers, and SLA countdowns, **JetBrains Mono** is introduced to provide a distinct, monospaced "utility" look that separates operational data from descriptive text.

- **Headlines:** Bold and tight to minimize vertical space.
- **Body:** Standardized for readability in order lists and AI insights.
- **Labels:** Monospaced and uppercase for system tags (e.g., `[STIR-FRY]`, `TABLE 3`).
- **Mobile Scaling:** Headline sizes are reduced by ~15% for tablet/handheld kitchen displays to maintain information density.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model on desktop to ensure that critical controls remain in predictable locations, switching to a **Fluid** model for tablet-based kitchen displays.

- **Rhythm:** An 8px/4px base unit system ensures a compact layout, allowing more "Order Cards" to fit on a single screen.
- **Grid:** A 12-column grid for analytics and settings; a 4-column "Kanban" layout for the Live Kitchen Board.
- **Breakpoints:**
  - **Mobile/Handheld:** Single column, prioritized for QC checks.
  - **Tablet (Landscape):** The primary kitchen device. Uses condensed cards and persistent sidebar.
  - **Desktop:** The manager's view. Full metrics, analytics, and station heatmaps.

## Elevation & Depth

To maintain a "fast-paced" and "flat" operational feel, this design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Low-contrast Outlines**:

- **Layer 0 (Background):** Deep Charcoal (#18181B).
- **Layer 1 (Cards/Sidebar):** Surface Elevated (#27272A).
- **Layer 2 (Modals/Popovers):** Surface Elevated with a 1px #3F3F46 border and a subtle 10% black shadow to lift it from the UI.
- **Active State:** Elements like "Cooking" cards may use a 2px Primary Orange left-border to indicate focus without changing the card's elevation level.

## Shapes

The shape language uses **Rounded (0.5rem)** corners to soften the industrial nature of the dashboard. 

- **Cards:** 0.5rem (8px) for standard containers.
- **Buttons/Inputs:** 0.5rem (8px) to provide a comfortable touch target.
- **Badges/Status Tags:** Pill-shaped (rounded-full) for immediate identification as non-interactive status indicators.
- **QC Inspection Area:** The camera dropzone uses a dashed `rounded-lg` (1rem) border to distinguish it as a specialized interactive zone.

## Components

- **Buttons:** 
  - **Primary:** Solid Primary Orange with white text for "Run AI Optimizer" or "QC Check".
  - **Danger:** Solid Secondary Red for "Return to Kitchen".
  - **Ghost:** Transparent background with Surface Stroke for secondary actions.
- **Order Cards:** Feature a top-aligned SLA Progress Bar. Special requests are housed in a High-Contrast Yellow box with bold black text.
- **Badges:** Small, bold, uppercase labels (JetBrains Mono) with high-contrast backgrounds (Red for "OVERLOAD", Green for "NORMAL").
- **Station Heatmap Cards:** Large horizontal cards that use background color shifts (e.g., a faint red wash) when a station is in an "OVERLOAD" state.
- **AI Insight Box:** Uses a thin Primary Orange border and a "sparkle" or "AI" icon to denote machine-generated suggestions.
- **Input Fields:** Dark background, 1px stroke, 0.5rem corner radius. Focus state uses a 2px Primary Orange glow.