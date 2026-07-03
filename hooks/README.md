# Custom Hooks

Custom React hooks for the Aone Digital India website.

## Available Hooks

| Hook | Purpose |
|------|---------|
| `useScrollPosition` | Track vertical scroll position |
| `useMediaQuery` | Responsive breakpoint detection |
| `useTheme` | Dark/light theme management |
| `useLocalStorage` | Persist state to localStorage |
| `useIntersectionObserver` | Detect element visibility |
| `useWindowSize` | Get window dimensions reactively |
| `useDebounce` | Debounce rapidly changing values |
| `useClickOutside` | Detect clicks outside an element |
| `useContactForm` | Contact form state and submission |
| `useLockBodyScroll` | Prevent body scroll (for modals) |

## Usage

```tsx
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Navbar = () => {
  const scrollY = useScrollPosition();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return <nav className={scrollY > 50 ? 'scrolled' : ''}>{...}</nav>;
};
```

## Guidelines

- Hooks must start with `use` prefix
- Each hook in its own file
- Fully typed with TypeScript
- Include JSDoc comments
- Include unit tests in `tests/`
