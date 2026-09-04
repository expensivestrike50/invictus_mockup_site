
# Restore Mobile & Tablet Animations

## Overview

Remove the mobile performance optimizations that disabled scroll animations on mobile and tablet devices. This will restore the full parallax and scroll-based animations to match the desktop experience.

## Changes Required

### 1. Hero.tsx - Restore Parallax Animation

Remove the `isMobile` conditional from all parallax transforms so mobile/tablet devices get the same smooth parallax effect as desktop.

**Current (disabled on mobile):**
```typescript
const y1 = useTransform(smoothProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '15%']);
```

**After (full animation):**
```typescript
const y1 = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
```

Also remove the `useIsMobile` hook import since it will no longer be needed.

---

### 2. CallToAction.tsx - Restore Scatter Animation

Remove the `isMobile` conditional from all X, Y, and scale transforms so the images animate outward on scroll for all devices.

**Current (disabled on mobile):**
```typescript
const x1 = useTransform(smoothProgress, [0.2, 0.95], isMobile ? ['0vw', '0vw'] : ['0vw', '-30vw']);
const scale1 = useTransform(smoothProgress, [0.2, 0.95], [1, isMobile ? 1 : 0.8]);
```

**After (full animation):**
```typescript
const x1 = useTransform(smoothProgress, [0.2, 0.95], ['0vw', '-30vw']);
const scale1 = useTransform(smoothProgress, [0.2, 0.95], [1, 0.8]);
```

Also remove the `useIsMobile` hook import since it will no longer be needed.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Hero.tsx` | Remove `isMobile` conditionals from parallax transforms, remove hook import |
| `src/components/CallToAction.tsx` | Remove `isMobile` conditionals from all transforms, remove hook import |

---

## Impact

- Full scroll animations will be active on all devices (mobile, tablet, desktop)
- Performance on mobile devices may be reduced due to heavy scroll-based animations
- Visual experience will be consistent across all screen sizes
