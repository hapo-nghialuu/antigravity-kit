# Design Guidelines

## System

### CSS Framework
- **Primary**: Tailwind CSS v4
- **Typography**: @tailwindcss/typography
- **Animation**: tw-animate-css

### UI Library
- **Base Components**: @base-ui/react
- **Icons**: lucide-react
- **Themes**: next-themes

### Color System

The project uses CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode values */
}
```

### Typography

- **Font Family**: System font stack (Inter fallback)
- **Headings**: font-semibold, tracking-tight
- **Body**: text-base, leading-relaxed
- **Code**: font-mono, text-sm

```tsx
// Heading styles
<h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
<h2 className="text-3xl font-semibold tracking-tight">
<h3 className="text-2xl font-semibold tracking-tight">

// Body text
<p className="leading-7 [&:not(:first-child)]:mt-6">
```

## Patterns

### Component Patterns

1. **Server Components by Default**
   ```tsx
   // Default: Server Component
   export function DocPage() {
     return <div>Content</div>;
   }
   ```

2. **Client Components When Needed**
   ```tsx
   'use client';

   export function InteractiveButton() {
     const [count, setCount] = useState(0);
     return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
   }
   ```

3. **Composition Pattern**
   ```tsx
   <Card>
     <CardHeader>
       <CardTitle>Title</CardTitle>
       <CardDescription>Description</CardDescription>
     </CardHeader>
     <CardContent>Content</CardContent>
   </Card>
   ```

### Layout Patterns

1. **Container**
   ```tsx
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   ```

2. **Grid Layouts**
   ```tsx
   // Two column
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

   // Three column
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
   ```

3. **Sidebar Layout**
   ```tsx
   <div className="flex">
     <aside className="w-64 shrink-0">...</aside>
     <main className="flex-1">...</main>
   </div>
   ```

### Button Patterns

```tsx
// Primary
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">

// Secondary
<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">

// Ghost
<Button className="hover:bg-accent hover:text-accent-foreground">

// Outline
<Button className="border border-input bg-background hover:bg-accent">
```

## Responsive

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

### Mobile-First Approach

```tsx
// Base: Mobile styles
// sm: 640px+
// md: 768px+
// lg: 1024px+

// Example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 col mobile, 2 col tablet, 3 col desktop */}
</div>
```

### Common Responsive Patterns

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop only</div>

// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">

// Full width mobile, constrained desktop
<div className="w-full md:max-w-2xl">

// Text sizes
<h1 className="text-2xl md:text-4xl lg:text-5xl">
```

## Documentation Design

### MDX Components

```tsx
// Code blocks with syntax highlighting
```typescript
const example = "hello";
```

// Callouts
<Note type="info">Information message</Note>
<Note type="warning">Warning message</Note>
<Note type="danger">Danger message</Note>

// Tables
| Column 1 | Column 2 |
|----------|----------|
| Value 1  | Value 2  |
```

### Content Structure

```mdx
---
title: Page Title
description: Brief description for SEO
---

# Page Title

Introduction paragraph explaining the content.

## Section 1

Content with:
- Bullet points
- Numbered lists
- **Bold text**
- *Italic text*

## Section 2

```code example```

### Subsection

More detailed content.
```

## Animation

### Transitions

```tsx
// Smooth transitions
<div className="transition-colors duration-200">

// Hover effects
<button className="hover:scale-105 transition-transform">

// Fade in
<div className="animate-in fade-in duration-500">
```

### Motion Patterns

1. **Page Transitions**: Subtle fade
2. **Button Hover**: Scale up slightly
3. **Loading States**: Pulse animation
4. **Theme Toggle**: Smooth color transition

## Accessibility

### Focus States

```tsx
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
```

### Reduced Motion

```tsx
<div className="motion-safe:animate-fade-in">
```

### ARIA Labels

```tsx
<button aria-label="Toggle menu">
  <MenuIcon />
</button>
```

## Icon Usage

```tsx
import { IconName } from 'lucide-react';

// Size variants
<IconName className="h-4 w-4" />  // Small
<IconName className="h-5 w-5" />  // Default
<IconName className="h-6 w-6" />  // Large
```

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem | Tight spacing |
| `space-2` | 0.5rem | Default gap |
| `space-4` | 1rem | Standard gap |
| `space-6` | 1.5rem | Section gap |
| `space-8` | 2rem | Large gap |
| `space-12` | 3rem | Section padding |

## Best Practices

1. **Use semantic HTML** - Proper heading hierarchy
2. **Color contrast** - WCAG 4.5:1 for text
3. **Touch targets** - Min 44x44px for mobile
4. **Consistent spacing** - Use spacing scale
5. **Dark mode support** - Test both themes
