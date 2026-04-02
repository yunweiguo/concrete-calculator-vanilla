# Design System

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| brand-primary | `#1e40af` (blue-800) | Primary buttons, links, accent borders, labels |
| brand-secondary | `#3b82f6` (blue-500) | Focus rings, secondary accents |
| slate-900 | `#0f172a` | Headings |
| slate-800 | `#1e293b` | Body text, secondary buttons |
| slate-700 | `#334155` | Paragraph text |
| slate-600 | `#475569` | Descriptions, supporting text |
| slate-500 | `#64748b` | Labels, small text, disclaimers |
| slate-300 | `#cbd5e1` | Borders, dividers |
| slate-200 | `#e2e8f0` | Card borders |
| slate-50 | `#f8fafc` | Input backgrounds, accent row backgrounds |
| white | `#ffffff` | Page background, card backgrounds |
| amber-500 | `#f59e0b` | Budget check accent border |
| red-500 | `#ef4444` | Error states |

## Typography

**Font:** System font stack (Tailwind default). No external fonts.

| Element | Classes | Size |
|---------|---------|------|
| H1 (hero) | `text-4xl md:text-6xl font-extrabold leading-tight` | 36px / 60px |
| H2 (section) | `text-2xl font-bold` | 24px |
| H3 (sub-section) | `text-lg font-semibold` | 18px |
| Body | default `text-slate-800` | 16px |
| Small | `text-sm` | 14px |
| Label | `text-xs font-semibold uppercase tracking-[0.25em]` | 12px |

## Layout

### Containers

| Pattern | Max width | Classes |
|---------|-----------|---------|
| Main content | 896px | `max-w-4xl mx-auto` |
| Hero description | 768px | `max-w-3xl mx-auto` |
| Page wrapper | 1280px | `container mx-auto px-4 lg:px-6` |

### Spacing

| Context | Classes |
|---------|---------|
| Between major sections | `mt-20 md:mt-32` |
| Between calculator and guide | `mt-12` |
| Between guide and CTA | `mt-12 pt-8 border-t border-slate-200` |
| Card padding | `p-6 sm:p-8` |
| Grid gaps | `gap-8` (main), `gap-6` (lists), `gap-4` (small items) |

## Components

### Calculator Card

```html
<div class="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200">
  <!-- Calculator inputs and results -->
</div>
```

### Decision Guide

```html
<section class="mt-12 max-w-4xl mx-auto" data-decision-page="...">
  <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200">
    <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">
      Decision Guide
    </p>
    <!-- Title, summary, accent rows, lists, disclaimer -->
  </div>
</section>
```

Accent rows use `border-l-4` with brand-primary / amber-500 / slate-400.

### CTA Buttons

**Primary:** Solid blue, white text.
```html
<a class="inline-flex items-center justify-center rounded-lg bg-brand-primary
   px-5 py-3 text-sm font-semibold text-white hover:bg-brand-primary/90">
  Button text
</a>
```

**Secondary:** Bordered, slate text.
```html
<a class="inline-flex items-center justify-center rounded-lg border border-slate-300
   px-5 py-3 text-sm font-semibold text-slate-800 hover:border-brand-primary
   hover:text-brand-primary">
  Button text
</a>
```

CTA container between guide and next section:
```html
<div class="mt-12 pt-8 border-t border-slate-200 max-w-4xl mx-auto
   flex flex-col gap-3 sm:flex-row">
```

### Form Inputs

```html
<input type="number" class="mt-1 block w-full px-4 py-2 bg-slate-50
  border border-slate-300 rounded-lg focus:ring-brand-secondary
  focus:border-brand-secondary">
```

Error state adds `ring-2 ring-red-500`.

### Hero Section

```html
<section class="text-center">
  <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
    Title
  </h1>
  <p class="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
    Description
  </p>
</section>
```

## Responsive Breakpoints

| Breakpoint | Width | Typical usage |
|-----------|-------|---------------|
| sm | 640px | Card padding bump, CTA row |
| md | 768px | 2-col grids, heading size scale |
| lg | 1024px | Container padding bump |

Mobile-first. All layouts stack vertically by default.

## Schema.org

All calculator pages include:
- `WebApplication` schema (9 pages)
- `FAQPage` schema with Q&A pairs (19 pages)
- `HowTo` schema with 3-step instructions (17 pages)

Schemas are in `<script type="application/ld+json">` blocks in `<head>`.

## Anti-patterns (avoid)

- No purple/indigo gradients
- No icons-in-colored-circles as section decoration
- No emoji as design elements
- No generic hero copy ("Unlock the power of...")
- No flat single-color backgrounds on hero sections
