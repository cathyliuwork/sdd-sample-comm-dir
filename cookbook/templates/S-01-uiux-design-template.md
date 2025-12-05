# S-01: UI/UX Design System

**Version**: 1.0
**Last Updated**: YYYY-MM-DD
**Status**: ✅ Spec Complete / 🚧 In Progress / ❌ Not Started

---

## Quick Reference

**Purpose**: Define visual design language, UI patterns, platform specifications, and design rationale

**Used By**: All features with user interface components

**Design Mode**:
- [ ] **Mode A: Self-Contained** (No professional designer - AI generates complete design)
- [ ] **Mode B: External Reference** (Professional design system exists - reference + extend)

---

## 1. Platform & Device Strategy

### Primary Platform
- [ ] Web (Desktop-first)
- [ ] Web (Mobile-first)
- [ ] Responsive Web (Desktop + Mobile + Tablet)
- [ ] iOS Native App
- [ ] Android Native App
- [ ] Cross-platform Mobile (React Native / Flutter)
- [ ] Desktop Application (Electron / Native)
- [ ] CLI / Terminal Application
- [ ] API-only / Backend / Data Pipeline (No UI currently)

---

### ⚠️ For Projects with No UI (Backend / API / Data Pipeline)

**If your project has no user-facing interface**, use this placeholder template for S-01:

```markdown
# S-01: UI/UX Design System

## Platform & Device Strategy

**Primary Platform**: [Backend API / Data Pipeline / Microservice / CLI Tool] (No graphical UI currently)

## Design System Source

**Status**: No user-facing graphical interface at this time.

**Future Considerations**:

This S-01 placeholder reserves the specification slot for potential future UI needs:

- **Monitoring Dashboards**: Grafana, custom admin dashboards, metrics visualization
- **Admin Interfaces**: Internal tooling, configuration UIs, management consoles
- **API Documentation Design**: OpenAPI/Swagger UI styling, documentation portals
- **Data Visualization**: Charts, graphs, reporting interfaces (if data project)
- **CLI Terminal UI** (if CLI tool): See Section 8 below for terminal design patterns

**When UI needs arise**: Expand this document using either:
- **Mode A** (Self-Contained): Generate design tokens with AI assistance
- **Mode B** (External Reference): Link to external design system (Figma/Sketch)

**For Now**: This placeholder satisfies the requirement that ALL projects must have S-01.

---

## Related Documents (For Backend/API Projects)

Even without traditional UI, these specifications still apply:
- **S-00: Architecture** - System design and tech stack
- **S-02: Testing Strategy** - Quality gates (API contract tests, integration tests)
- **S-03: Database Schema** - Data model (if applicable)
- **S-04: Authentication** - API authentication and authorization

---

END OF PLACEHOLDER - Skip remaining sections for API-only/backend projects
```

**If you selected "API-only / Backend / Data Pipeline" above**, copy the placeholder template above and skip the rest of this document.

**If you selected any UI-based platform**, continue with the sections below:

---

### Target Devices

**Desktop**:
- Minimum resolution: 1280x720
- Recommended: 1920x1080
- Max content width: [specify, e.g., 1280px]

**Tablet** (if applicable):
- iPad: 768x1024 and up
- Android tablets: 600dp and up

**Mobile** (if applicable):
- iPhone: 375x667 minimum
- Android: 360x640 minimum

### Responsive Breakpoints

```css
/* Define your breakpoints */
--breakpoint-mobile: 0px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
```

---

## 2. Target Users & Usage Context

### User Profile

**Demographics**:
- **Age Range**: [e.g., 25-40 years old]
- **Tech Proficiency**: [Novice / Medium / Expert]
- **Industry/Role**: [e.g., Healthcare professionals, Students, Business owners]
- **Geographic**: [Global / Specific regions]

**User Characteristics** (Important for design):
- Vision: [20/20 / Aging eyes / Color-blind considerations]
- Dexterity: [High / Medium / Limited mobility]
- Digital literacy: [Apps they're familiar with]

### Usage Context

**Primary Usage Scenarios**:
1. **Scenario 1**: [e.g., Office desktop work during business hours]
   - Device: Desktop
   - Environment: Well-lit office
   - Session duration: 30-60 minutes
   - Frequency: 4-6 times per day

2. **Scenario 2**: [e.g., Mobile check-in during commute]
   - Device: Smartphone
   - Environment: Variable lighting, moving (train/bus)
   - Session duration: 2-5 minutes
   - Frequency: 2-3 times per day

**Environmental Factors**:
- **Lighting**: [Bright office / Dim room / Outdoor sunlight / Variable]
- **Noise level**: [Quiet / Moderate / Noisy - affects audio feedback needs]
- **Distractions**: [Focused environment / Multitasking / High distraction]

**Emotional Context**:
- **User state**: [Calm / Stressed / Rushed / Exploratory]
- **Task urgency**: [Time-critical / Casual browsing / Deep focus]

### Design Implications

Based on user profile and usage context, the design must address:

1. **[Implication 1]**: [e.g., Larger text size for 40+ age group]
2. **[Implication 2]**: [e.g., High contrast for outdoor mobile use]
3. **[Implication 3]**: [e.g., Quick-access shortcuts for stressed users]
4. **[Implication 4]**: [e.g., Generous spacing to reduce cognitive load]

---

## 3. Design System Source

**Select one mode below based on your project context:**

---

### 📊 Decision Tree: Which Mode Should You Use?

**Use Mode A (Self-Contained Design)** if:

- ✅ **No professional designer on team** - You're a developer/founder without dedicated design resources
- ✅ **Startup/MVP stage** - Need to move fast, iterate quickly based on user feedback
- ✅ **Have design inspiration** - Screenshots, reference sites, design keywords you can provide
- ✅ **AI can generate design** - Comfortable with AI-generated design tokens based on target users
- ✅ **Small to medium project** - Not a design-critical product (internal tools, MVPs, prototypes)
- ✅ **Design can evolve** - Design system will mature over time, starting simple is okay

**Use Mode B (External Reference)** if:

- ✅ **Professional design system exists** - Figma, Sketch, Adobe XD files already created
- ✅ **Design team owns design** - Dedicated designers maintain design system as source of truth
- ✅ **Design tokens already defined** - Colors, typography, spacing pre-determined externally
- ✅ **Need design/dev sync** - Changes to design system should update in Figma first, then code
- ✅ **Large or design-critical project** - Consumer app, brand-focused product, design-led company
- ✅ **Multi-platform consistency** - Same design system used across web, mobile, marketing

**Still unsure?**

- **Default to Mode A** for most projects (simpler, faster, AI-friendly)
- **Choose Mode B only if** you have an existing external design system to reference
- **You can switch modes later** - Start with Mode A, migrate to Mode B when design team joins

---

### **Mode A: Self-Contained Design** (For projects without professional designers)

**Design Language**:
- **Visual Style**: [Modern / Classic / Playful / Professional / Minimal / etc.]
- **Design Philosophy**: [1-2 sentence guiding principle]

**Inspiration Context** (Optional reference, not required for implementation):
- **Similar to**: [e.g., Linear, Notion, Stripe Dashboard]
- **Reference URL**: [if publicly available]
- **User-provided references**: [Analyzed from origin/ folder]

**Design Extraction & Rationale**:
All design tokens below are extracted from references and adapted for:
- Target users: [age, tech level, industry]
- Usage context: [devices, environment, scenarios]
- Accessibility: [WCAG level, specific needs]

**Note**: All design specifications below are self-contained. No external file dependencies.

---

### **Mode B: External Design System** (For projects with professional designers)

**Primary Design Source**:
- **Design System URL**: [Figma / Sketch / Adobe XD / Notion link]
- **Maintained by**: [Design Team / Person name]
- **Last Updated**: YYYY-MM-DD
- **Version**: [e.g., 2.5.0]
- **Design Lead**: [Name, contact]

**Design System Coverage**:
✅ Color palette (light mode)
✅ Typography scale
✅ Primary components (buttons, forms, cards)
✅ Iconography
⚠️ Dark mode (partially defined)
❌ Responsive breakpoints (not specified)
❌ Accessibility annotations (missing)
❌ Animation guidelines (missing)

**Access & Sync**:
- **For Designers**: Use Figma file directly
- **For Developers**: Export tokens via [Figma Tokens plugin / Style Dictionary / manual]
- **Sync method**: [Manual / CI/CD automated / Git submodule]

**Source of Truth Hierarchy**:
1. Professional design system (Figma/etc.)
2. AI-generated extensions in this document (temporary)
3. Code implementation

---

## 4. Design Tokens

**Note**:
- **Mode A**: All tokens are defined inline below (self-contained)
- **Mode B**: Reference external design + extensions for gaps

---

### Color Palette

**Mode A: Complete Color System**

#### Primary Colors
```css
/* Main brand color - [describe purpose and rationale] */
--primary-50: #[hex];   /* Lightest tint for backgrounds */
--primary-100: #[hex];  /* Light backgrounds, hover states */
--primary-200: #[hex];
--primary-300: #[hex];
--primary-400: #[hex];
--primary-500: #[hex];  /* Main brand color - use for primary CTAs */
--primary-600: #[hex];  /* Hover state for primary buttons */
--primary-700: #[hex];
--primary-800: #[hex];
--primary-900: #[hex];  /* Darkest shade */

/* Rationale:
   Why this color was chosen considering:
   - User demographics (age, industry)
   - Usage context (environment, emotional state)
   - Cultural considerations
   - Accessibility (contrast ratios)
*/
```

#### Semantic Colors
```css
--success: #[hex];  /* Green - positive actions, success states */
--warning: #[hex];  /* Amber - caution, pending states */
--error: #[hex];    /* Red - errors, destructive actions */
--info: #[hex];     /* Blue - informational messages */

/* Rationale:
   - High saturation for quick recognition
   - Color-blind safe (distinct hues)
   - Cultural neutrality considered
*/
```

#### Neutrals (Background & Text)
```css
--gray-50: #[hex];    /* Page background */
--gray-100: #[hex];   /* Card backgrounds */
--gray-200: #[hex];   /* Borders, dividers */
--gray-300: #[hex];
--gray-400: #[hex];
--gray-500: #[hex];   /* Disabled states, placeholder text */
--gray-600: #[hex];   /* Secondary text */
--gray-700: #[hex];   /* Body text */
--gray-800: #[hex];
--gray-900: #[hex];   /* Headings, primary text */

/* Rationale:
   - Soft backgrounds (not pure white) reduce eye strain
   - Text not pure black (85-90% black is easier on eyes)
   - Sufficient contrast for long reading sessions
*/
```

**Usage Guidelines**:
- **Backgrounds**: Use gray-50 for page, gray-100 for cards
- **Text**: gray-900 for headings, gray-700 for body, gray-500 for labels
- **Borders**: gray-200 for subtle dividers, gray-300 for emphasized
- **Brand**: primary-500 for CTAs, links, active states
- **Interactive**: primary-600 for hover, primary-700 for active

---

**Mode B: External Color System + Extensions**

**Primary Colors**: Defined in [Figma link]

**AI-Generated Extensions** (Based on usage context):

```css
/* Dark mode color adjustments (not in professional design yet) */
--bg-dark: #[hex];              /* Based on brand colors */
--surface-dark: #[hex];         /* Elevated surfaces */
--text-dark: #[hex];            /* Not pure white - reduce glare */
--primary-dark: #[hex];         /* Adjusted for dark background contrast */

/* Rationale for dark mode generation:
   - User context: [e.g., 40% of users work evening hours]
   - Requested by: [user feedback / usage analytics]
   - Temporary until design team provides official dark theme
*/
```

**Design Team Note**: Please review and replace with official specifications when available.

---

### Typography

**Mode A: Complete Typography System**

#### Font Families
```css
/* Primary font for UI */
--font-sans: '[Font Name]', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace for code, data */
--font-mono: '[Mono Font]', 'Courier New', monospace;
```

**Font Loading**:
```html
<!-- Add to <head> if using web fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=[Font]:[weights]&display=swap" rel="stylesheet">
```

**Rationale**:
- **Font choice**: [e.g., Inter selected for geometric clarity and excellent screen readability]
- **User consideration**: [e.g., Sized appropriately for 35-50 age group]
- **Performance**: System font fallbacks ensure fast loading

#### Type Scale
```css
/* Mobile-first scale, adjust for larger screens */
--text-xs: 0.75rem;     /* 12px - labels, captions */
--text-sm: 0.875rem;    /* 14px - secondary text, small UI */
--text-base: 1rem;      /* 16px - body text (NEVER smaller for accessibility) */
--text-lg: 1.125rem;    /* 18px - emphasized text */
--text-xl: 1.25rem;     /* 20px - small headings */
--text-2xl: 1.5rem;     /* 24px - section headings */
--text-3xl: 1.875rem;   /* 30px - page titles */
--text-4xl: 2.25rem;    /* 36px - hero headings */
--text-5xl: 3rem;       /* 48px - large display */
```

**Rationale**:
- **Base size**: 16px minimum for readability
- **User age**: [Adjusted larger/smaller based on target age group]
- **Mobile**: 16px prevents iOS auto-zoom on input focus
- **Scaling**: [Minor third / Major third / Perfect fourth] scale ratio

#### Font Weights
```css
--font-regular: 400;    /* Body text, descriptions */
--font-medium: 500;     /* Labels, emphasized text */
--font-semibold: 600;   /* Buttons, subheadings */
--font-bold: 700;       /* Headings, strong emphasis */
```

#### Line Heights
```css
--leading-tight: 1.25;    /* Headings, compact UI */
--leading-normal: 1.5;    /* Body text (accessibility minimum) */
--leading-relaxed: 1.75;  /* Long-form content, easier reading */
```

**Accessibility Note**:
- Line height minimum 1.5 for body text (WCAG 2.1 guideline)
- Adjusted for user context: [e.g., 1.6 for long work sessions]

---

**Mode B: External Typography + Extensions**

**Typography System**: Defined in [Figma link]

**AI-Generated Extensions**:

```css
/* Responsive typography adjustments (not in design system) */
@media (min-width: 768px) {
  --text-3xl: 2.25rem;  /* Larger on desktop */
  --text-4xl: 3rem;
}

/* Rationale:
   - Design system is mobile-only
   - Desktop users benefit from larger type at wider viewports
   - Follows responsive typography best practices
*/
```

---

### Spacing System

```css
/* Based on [4px / 8px] grid system */
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px - minimum touch target */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

**Rationale**:
- **Grid system**: [4px / 8px] for mathematical consistency
- **Touch targets**: Minimum 44px (iOS) / 48px (Material) for mobile
- **User dexterity**: [Adjusted larger for older users or smaller for expert users]

---

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px - subtle rounding */
--radius-md: 0.5rem;     /* 8px - standard buttons, inputs */
--radius-lg: 0.75rem;    /* 12px - cards */
--radius-xl: 1rem;       /* 16px - prominent elements */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Pills, circular elements */
```

**Style**: [Sharp / Subtle / Rounded / Very rounded]

---

### Shadows

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

**Usage**:
- **Flat design**: Use minimal shadows (xs, sm)
- **Depth**: Use md-lg for cards, elevated UI
- **Modals**: Use xl-2xl for overlays

---

## 5. Component Patterns

### Buttons

**Variants**:
- **Primary**: Solid background, white text (main CTAs)
- **Secondary**: Outline, transparent background
- **Ghost**: No border, only text (tertiary actions)
- **Danger**: Red/destructive color

**Sizes**:
```typescript
type ButtonSize = 'sm' | 'md' | 'lg';

// sm: height 32px, padding 8px 12px, text-sm
// md: height 40px, padding 10px 16px, text-base
// lg: height 48px, padding 12px 24px, text-lg
```

**Rationale for sizes**:
- **sm**: Compact UI, desktop-only actions
- **md**: Standard desktop buttons
- **lg**: Mobile-friendly (meets 44px touch target), primary actions

**States**:
- Default
- Hover (darken 10%)
- Active (darken 15%)
- Disabled (50% opacity, no pointer)
- Loading (spinner + disabled state)

**Code Example**:
```css
.btn-primary {
  height: var(--space-10);
  padding: 0 var(--space-4);
  background: var(--primary-500);
  color: white;
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
}

.btn-primary:hover {
  background: var(--primary-600);
}
```

---

### Form Elements

**Input Fields**:
```css
.input {
  height: 44px;  /* Adjusted for [user group] */
  padding: 12px 16px;
  font-size: var(--text-base);  /* 16px - prevents iOS zoom */
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(var(--primary-500-rgb), 0.1);
}
```

**Labels**:
- Position: Above input
- Font: text-sm, font-medium
- Required indicator: Red asterisk or (Required) text
- Optional indicator: (Optional) in gray

**Validation**:
- **Error**: Red border, red text below
- **Success**: Green border, green checkmark icon
- **Warning**: Amber border, warning icon

**Rationale**:
- **Height**: [Adjusted for touch/dexterity needs]
- **Focus ring**: 3px for visibility in [usage environment]

---

### Cards

**Structure**:
```html
<Card>
  <CardHeader>    <!-- Title + optional actions -->
  <CardContent>   <!-- Main content -->
  <CardFooter>    <!-- Actions or metadata -->
</Card>
```

**Variants**:
- **Flat**: Border only, no shadow
- **Elevated**: shadow-md
- **Interactive**: Hover shadow-lg + subtle scale

```css
.card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.card-elevated {
  border: none;
  box-shadow: var(--shadow-md);
}

.card-interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  transition: all 200ms ease-out;
}
```

---

### Navigation

**Desktop Navigation**:
- **Type**: [Top nav bar / Side drawer / Tabs]
- **Height**: 64px (standard)
- **Sticky**: Yes/No
- **Layout**: Logo left, menu center/right

**Mobile Navigation**:
- **Type**: [Hamburger menu / Bottom tabs / Slide-out drawer]
- **Touch targets**: Minimum 48px height
- **Gestures**: Swipe to open/close (if drawer)

**Rationale**:
- **Pattern choice**: Based on [user familiarity, content structure]
- **Mobile**: [Bottom tabs for frequent switching / Hamburger for less frequent]

---

## 6. Layout Patterns

### Grid System

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}
```

**Breakpoint Behavior**:
- Mobile: Single column, full width
- Tablet: 8-column grid
- Desktop: 12-column grid

---

## 7. Accessibility Requirements

### WCAG Compliance Level

**Target**: [WCAG 2.1 Level AA / AAA]

### Color Contrast

**Text Contrast** (WCAG 2.1):
- Normal text (< 18px): Minimum 4.5:1 (AA) / 7:1 (AAA)
- Large text (≥ 18px or 14px bold): Minimum 3:1 (AA) / 4.5:1 (AAA)
- UI components: Minimum 3:1

**Verified Ratios**:
- Body text (gray-700 on white): [ratio]:1 ✅
- Headings (gray-900 on white): [ratio]:1 ✅
- Primary button (white on primary-500): [ratio]:1 ✅

**User Context**: [e.g., Outdoor use requires AAA level contrast]

### Keyboard Navigation

- All interactive elements must be focusable
- Logical tab order (left-to-right, top-to-bottom)
- Visible focus indicators (2-3px ring, high contrast)
- Skip links for main content
- Keyboard shortcuts for power users (optional)

### Screen Readers

- Semantic HTML (`<nav>`, `<main>`, `<button>`, not `<div>`)
- ARIA labels where semantic HTML insufficient
- ARIA live regions for dynamic content
- Alt text for images
- Form labels properly associated

### Motion & Animation

- Respect `prefers-reduced-motion`
- Provide opt-out for non-essential animations
- No auto-playing videos with sound
- Infinite scrolling must have pause option

**User Context**: [e.g., Stressed users sensitive to jarring motion]

---

## 8. Animation & Interactions

### Transition Timing

```css
--duration-instant: 100ms;   /* Micro-interactions (button press) */
--duration-fast: 150ms;      /* UI feedback (hover) */
--duration-normal: 200ms;    /* Standard transitions (dropdown open) */
--duration-slow: 300ms;      /* Modal, drawer animations */
--duration-slower: 500ms;    /* Page transitions */
```

**Rationale**:
- [Fast timing for responsive feel / Slower for deliberate feel]
- User expectation: [Gen Z expects snappy / Older users need deliberate]

### Easing Functions

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage**:
- **Ease-out**: Elements entering screen (feels natural)
- **Ease-in**: Elements exiting screen
- **Ease-in-out**: Position/size changes

### Common Animations

**Fade In**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide In**:
```css
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

---

## 9. Dark Mode

**Implementation**: [ ] Required [ ] Optional [ ] Not Applicable

**Trigger**:
- [ ] Automatic (respect `prefers-color-scheme`)
- [ ] Manual toggle in settings
- [ ] Time-based (auto-enable at night)

**Color Adjustments**:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: var(--gray-900);
    --surface: var(--gray-800);
    --text: var(--gray-100);
    --text-secondary: var(--gray-400);
    --border: var(--gray-700);

    /* Adjust primary for contrast */
    --primary-500: #[lighter version for dark bg];
  }
}
```

**Rationale**:
- User context: [e.g., 60% of sessions happen after 8pm]
- Health: Reduce blue light for evening use
- Preference: Power users often prefer dark mode

---

## 10. CLI / Terminal Design

**(Only for command-line applications)**

### Color Scheme

```bash
# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RESET='\033[0m'
```

**Usage**:
- Errors: Red
- Success: Green
- Warnings: Yellow
- Info: Blue
- Prompts: Cyan

### Text Formatting

**Headers**:
```
═══════════════════════════════
  Application Name v1.0
═══════════════════════════════
```

**Tables**:
```
┌─────────────┬──────────┬─────────┐
│ Name        │ Status   │ Count   │
├─────────────┼──────────┼─────────┤
│ Item 1      │ Active   │ 42      │
└─────────────┴──────────┴─────────┘
```

**Progress Bars**:
```
[████████████░░░░░░░░] 60% Complete
```

**Rationale**:
- User context: [Developer audience expects rich terminal UI]
- Accessibility: Color + symbols (not color alone)

---

## 11. Design Rationale Summary

### Key Design Decisions & Context

**1. [Decision Name]**: [e.g., Larger Typography]
- **Users**: [e.g., 35-55 age group, presbyopia consideration]
- **Context**: [e.g., Long work sessions, need eye comfort]
- **Rationale**: [Why this decision serves users in their context]

**2. [Decision Name]**: [e.g., High Contrast Colors]
- **Users**: [e.g., Mobile users, outdoor workers]
- **Context**: [e.g., Bright sunlight, variable lighting]
- **Rationale**: [WCAG AAA for outdoor readability]

**3. [Decision Name]**: [e.g., Generous Spacing]
- **Users**: [e.g., Stressed users, multitasking]
- **Context**: [e.g., High-pressure environment, quick scanning needed]
- **Rationale**: [Reduce cognitive load, improve scannability]

**4. [Decision Name]**: [e.g., Calm Color Palette]
- **Users**: [e.g., Healthcare workers, high-stress job]
- **Context**: [e.g., Used during patient care, emotional regulation needed]
- **Rationale**: [Blues and greens reduce stress, professional appearance]

---

## 12. Implementation Notes

### Tech Stack Integration

**If using Tailwind CSS**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#...',
          500: '#...',
          // ... all shades
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        // Use design tokens
      }
    }
  }
}
```

**If using CSS Variables**:
```css
/* tokens.css */
:root {
  --primary-500: #...;
  --font-sans: 'Inter', sans-serif;
  /* ... all tokens */
}
```

**If using CSS-in-JS** (styled-components, emotion):
```typescript
export const theme = {
  colors: { /* tokens */ },
  fonts: { /* tokens */ },
  spacing: { /* tokens */ },
};
```

### For AI Coding Tools

This design system is optimized for:
- **User age**: [range]
- **Tech proficiency**: [level]
- **Primary context**: [device + environment]
- **Secondary context**: [device + environment]
- **Emotional state**: [description]

**When implementing components**:
- ✅ DO use design tokens defined above
- ✅ DO consider user age and context in all decisions
- ✅ DO test in described usage environments
- ✅ DO prioritize accessibility as specified
- ❌ DO NOT reduce font sizes below minimums
- ❌ DO NOT use low-contrast colors (fails user context)
- ❌ DO NOT ignore design rationale (it's context-driven)

All design decisions have explicit rationale linking to users or context. Follow them closely.

---

## 13. Design System Updates

**For Mode A (Self-Contained)**:
- When design evolves, update this document
- Maintain version history
- Communicate changes to development team

**For Mode B (External Design System)**:
- Professional design system is source of truth
- When official design updates, remove AI-generated extensions
- Update external reference links and versions
- Keep "AI Extensions" section only for gaps

---

## 14. Related Documents

- [S-00: System Architecture](./S-00-architecture.md) - Overall system design
- [F-XX: Responsive Design](../features/F-XX-responsive-design.md) - Implementation details
- [All UI Features] - All features with user interface components

---

## Notes

### Future Enhancements
- Component Storybook for visual regression testing
- Design token automation (Figma → Code via Style Dictionary)
- Accessibility audit tooling (axe-core, Pa11y)
- User testing validation of design decisions

### Known Limitations
- [Any design constraints or trade-offs]

### References
- Material Design 3: https://m3.material.io
- iOS Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- [Design inspiration sources]

---

**Template Version**: 1.0
**Last Updated**: 2025-11-27
