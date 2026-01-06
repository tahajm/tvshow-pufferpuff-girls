# TV Shows Explorer

A modern web application built with Next.js that allows users to explore TV shows and their episodes, featuring The Powerpuff Girls as the default show. Built with React Server Components, TypeScript, and Tailwind CSS.

## 🚀 Setup Instructions

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# (Optional) Configure environment variables
# Copy .env.example to .env.local and customize if needed
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linter
npm run lint

# Format code with Prettier
npm run prettier
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Architecture Decisions

### Server vs Client Components

**Show Details Page** (`/shows/[showid]`) - **Server Component**

- Leverages React Server Components for initial data fetching
- Benefits: Better SEO, faster initial load, reduced JavaScript bundle size
- Uses React's `cache()` for request deduplication between page render and `generateMetadata`
- Server-side rendering with ISR (Incremental Static Regeneration)
- Uses `generateStaticParams` to pre-build the default show at build time for instant loads; episode pages remain dynamic (SSR) due to scale (200+ episodes) and lack of clear prioritization criteria

**Episodes List** - **Client Component**

- **Critical Decision**: Shows like The Powerpuff Girls can have 200+ episodes, and some shows have thousands
- Server-rendering large lists would significantly slow down the initial page load and block rendering
- Client-side fetching with TanStack Query enables:
  - Progressive loading with skeleton states
  - Better perceived performance
  - Granular error handling without blocking the entire page
  - Future extensibility for search, filtering, and pagination
- **Result**: Fast initial page load (show info renders immediately), episodes load progressively in the background

### Data Fetching Strategy

**Server-Side (Next.js)**

- API functions in `src/lib/showsApi.ts` with Next.js fetch and ISR
- Revalidation strategy based on data volatility:
  - Shows: 24 hours (metadata changes infrequently)
  - Episodes list: 7 days (episode data is stable)
  - Individual episodes: 30 days (historical data rarely changes)

**Client-Side (TanStack Query)**

- Stale-while-revalidate pattern with 60s stale time
- Automatic background refetching
- Request deduplication and caching
- Optimistic updates ready for future features (favorites)

### Type Safety

- Comprehensive TypeScript types in `src/types/index.ts`
- Strict null checking and proper type narrowing throughout
- Type-safe API responses with full IntelliSense support

### Component Architecture

- Modular structure with co-located types, tests, and components
- Separation of concerns: presentational components vs container logic
- Barrel exports for clean imports
- Consistent naming conventions

### Design System Choice

**Note on Atlassian Design System**: The assignment specifies using Atlassian Design System, however `@atlaskit` packages require `react@^18.2.0` while this project uses React 19.2.3 (required by Next.js 16). Attempting to install results in peer dependency conflicts. Instead, I implemented a custom design system with Tailwind CSS following similar design principles (8px grid, semantic colors, accessible patterns).

## ⚖️ Key Trade-offs

### Episodes as Client Component

- **Trade-off**: Server-rendering would provide better SEO for individual episodes
- **Decision**: Client component with TanStack Query
- **Reasoning**:
  1. **Performance**: Server-rendering hundreds/thousands of episodes would block the entire page load
  2. **UX**: Progressive loading provides better perceived performance
  3. **Scalability**: Easier to add pagination, search, and filtering
  4. **Error Recovery**: Failed episode fetch doesn't break the entire page
- **Outcome**: Show information loads instantly, episodes stream in progressively

### Caching Strategy

- **Trade-off**: Fresh data vs API performance
- **Decision**: Conservative cache times (24h/7d/30d)
- **Reasoning**: TV show data is stable; aggressive caching reduces API load without sacrificing freshness
- **Result**: Fast page loads, reduced API costs, data still fresh enough for user needs

## ✅ Testing Coverage

### Unit Tests

- **API Layer** (`src/lib/showsApi.test.ts`): API functions, error handling, response parsing
- **Utilities** (`src/utils/textUtils.test.ts`): HTML stripping, text truncation, edge cases

### Component Tests

- **ShowEpisodes** (`src/components/ShowEpisodes/ShowEpisodes.test.tsx`):
  - Loading states (skeleton UI)
  - Error states with user-friendly messages
  - Empty states
  - Successful data rendering
  - Async flow with mocked TanStack Query

### Running Tests

```bash
npm test              # Watch mode
```

## ♿ Accessibility Features

### Semantic HTML

- Proper use of semantic elements: `<article>`, `<section>`, `<nav>`, `<main>`, `<time>`, `<figure>`
- Logical heading hierarchy (h1 → h2 → h3)
- Descriptive landmarks for screen reader navigation

### ARIA Attributes

- `aria-label` for meaningful context on interactive elements
- `aria-labelledby` for associating headings with regions
- `aria-hidden` for decorative elements
- `role="alert"` for error messages
- `aria-live` regions for dynamic content updates

### Keyboard Navigation

- All interactive elements are keyboard accessible (Tab, Enter, Space)
- Visible focus states with custom focus rings
- Focus management for page navigation
- No keyboard traps

### Screen Reader Support

- `.sr-only` utility class for screen-reader-only text
- Descriptive alt text for all images
- Contextual labels for time elements
- Proper button and link text

### Additional Considerations

- WCAG AA color contrast compliance
- Dark mode support with system preference detection
- Responsive text sizing (rem units)
- Semantic `<time>` elements with `dateTime` attributes
- Form controls are properly labeled (ready for future features)

## 🔮 What Would Be Improved With More Time

### Features

1. **Search & Filtering**: Real-time episode search, season/year filters
2. **Favorites System**: Server Action to persist favorite episodes (localStorage or database)
3. **Pagination**: Infinite scroll or traditional pagination

### Testing

1. **E2E Tests**: Playwright tests for critical user journeys
2. **More Component Coverage**: Test EpisodeCard, ShowCard, EpisodeDetail components

### Performance

1. **Route Prefetching**: Aggressive link prefetching on hover
2. **Image Placeholders**: LQIP (Low Quality Image Placeholders) with blur effect

### Code Quality

1. **Branded Types**: More strict TypeScript types (branded IDs, discriminated unions)
2. **Error Boundaries**: Granular error boundaries per section
3. **Monitoring**: Error tracking (Sentry) and analytics

### Accessibility

3. **Skip Links**: Skip to main content navigation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── shows/[showid]/    # Show detail page (RSC)
│   │   └── episodes/[episodeid]/  # Episode detail page (RSC)
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home (redirects to default show)
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── EpisodeCard/       # Episode thumbnail card
│   ├── EpisodeDetail/     # Full episode view
│   ├── ShowCard/          # Show information card
│   ├── ShowEpisodes/      # Episodes list (client component)
│   └── icons/             # SVG icon components
├── lib/                   # Business logic
│   └── showsApi.ts        # API functions with ISR
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── constants/             # App constants
```

## 🛠️ Technologies Used

### Core

- **Next.js** 16.1.1 - React framework with App Router
- **React** 19.2.3 - UI library with Server Components
- **TypeScript** 5.x - Type safety
- **Tailwind CSS** 4.x - Utility-first CSS (zero-runtime)

### State & Data Fetching

- **TanStack Query** 5.90.16 - Client-side data fetching and caching

### Utilities

- **html-react-parser** 5.2.11 - Safe HTML parsing for API responses

### Testing

- **Vitest** 4.0.16 - Fast unit test framework
- **Testing Library** 16.3.1 - Component testing utilities
- **jsdom** 27.4.0 - DOM implementation for tests

### Code Quality

- **ESLint** 9.x - Linting with Next.js config
- **Prettier** 3.7.4 - Code formatting

## 📊 API

This project uses the [TVMaze API](http://www.tvmaze.com/api) for TV show and episode data.

**Endpoints Used:**

- `GET /shows/:id` - Show details
- `GET /shows/:id/episodes` - Show episodes list
- `GET /episodes/:id` - Individual episode details
