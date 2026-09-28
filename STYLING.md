# Styling Guide

## Overview

This project uses **Tailwind CSS v4** with custom animations, **next-themes** for dark mode, and semantic HTML for styling consistency.

---

## Dark Mode

### Setup
- **Package:** `next-themes`
- **CSS Config:** `src/index.css` with `@variant dark`
- **Provider:** `src/App.jsx` wraps app with `<ThemeProvider>`
- **Toggle:** `src/components/ThemeToggle.jsx` for theme switching

### Using Dark Mode in Components

Add `dark:` prefix to Tailwind classes:
```jsx
className="bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white"
```

**Common patterns:**
```jsx
// Text
className="text-primary-black dark:text-primary-white"

// Backgrounds
className="bg-primary-white dark:bg-primary-dark-card"

// Borders
className="border-primary-black/10 dark:border-primary-white/10"

// Hover states
className="hover:text-primary-orange dark:hover:text-primary-orange"

// Muted text
className="text-primary-black/60 dark:text-primary-white/60"
```

### How It Works
1. `next-themes` adds `.dark` class to `<html>` element
2. Tailwind's `@variant dark` generates `.dark\:` prefixed selectors
3. CSS changes apply instantly when theme toggles
4. User preference saves to `localStorage.theme`

---

## Animations

### Animation Utilities

All animations are defined in `src/index.css` under `@layer utilities`:

| Class | Effect |
|-------|--------|
| `animate-fade-in-up` | Fade in + slide up (0.6s) |
| `animate-fade-in-down` | Fade in + slide down (0.6s) |
| `animate-fade-in-left` | Fade in + slide left (0.6s) |
| `animate-fade-in-right` | Fade in + slide right (0.6s) |
| `animate-scale-in` | Fade in + scale (0.6s) |
| `animate-float` | Continuous float motion (3s) |
| `animate-shimmer` | Shimmer effect (2s) |
| `animate-glow-pulse` | Pulsing glow (2s) |

### Stagger Delays

Use stagger classes to create sequential animations:
```jsx
className="animate-fade-in-up stagger-1"  // 0.1s delay
className="animate-fade-in-up stagger-2"  // 0.2s delay
className="animate-fade-in-up stagger-3"  // 0.3s delay
// ... stagger-4 through stagger-7
```

### Scroll-Triggered Animations

Use the `useScrollAnimation` hook to animate elements as they enter the viewport:

```jsx
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function MyComponent() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.2,        // Trigger at 20% visibility
    rootMargin: '0px 0px -50px 0px',  // Offset from bottom
    triggerOnce: true      // Only animate once (default)
  });

  return (
    <div ref={ref} className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}>
      Content animates in when scrolled into view
    </div>
  );
}
```

### Inline Transitions for Dynamic Elements

For elements that need smooth state transitions:

```jsx
const [isVisible, setIsVisible] = useState(false);

return (
  <div
    className="transition-all duration-700"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      transitionDelay: isVisible ? '100ms' : '0ms'
    }}
  >
    Content
  </div>
);
```

### Smooth Transitions

Use `transition-smooth` class for consistent transitions:
```jsx
className="transition-smooth hover:text-primary-orange"
// Applies: transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Color System

### Custom Colors

Defined in `src/index.css` under `@theme`:
```css
--color-primary-orange: #fe7141
--color-primary-purple: #cdabfe
--color-primary-sage: #d1ddd3
--color-primary-black: #000000
--color-primary-white: #ffffff
--color-primary-dark-bg: #0a0a0a
--color-primary-dark-card: #1a1a1a
```

### Usage in Classes

```jsx
className="bg-primary-orange text-primary-white border-primary-sage"
```

---

## Best Practices

### 1. Dark Mode
- Always pair light and dark classes
- Test both modes before shipping
- Use opacity variants for subtle distinctions (e.g., `/60`)

### 2. Animations
- Keep animations under 1s for UI interactions
- Use scroll-triggered animations for section reveals
- Test on low-end devices for performance

### 3. Reusability
- Define animations and colors once in CSS
- Reuse components instead of duplicating styles
- Use Tailwind utilities before custom CSS

### 4. Performance
- Avoid dynamic class names (Tailwind won't detect them)
- Use conditional ternary for class variations
- Animate only necessary properties (opacity, transform)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Dark mode not working | Verify `@variant dark` in `src/index.css` |
| Animations running twice | Check for duplicate animation classes on same element |
| FOUC (white flash) | Ensure FOUC prevention script in LandingPage.jsx |
| Theme not persisting | Check browser localStorage, verify ThemeProvider in App.jsx |
| Tailwind classes not applying | Use full class names, avoid dynamic class generation |
