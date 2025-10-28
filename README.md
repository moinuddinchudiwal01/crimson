# Research Papers Dashboard

A Next.js application for browsing and managing research paper data with advanced search, sorting, and filtering capabilities.

## Features

- Fetch and display research papers from API
- Search by Title, Author, or Journal
- Sort by Title, Year, or Impact Factor (ASC/DESC)
- Pagination with page navigation
- Detailed view modal for each paper
- Skeleton loaders and debounced search

## Tech Stack

- Next.js 14.0.0+
- React 18
- SCSS Modules
- JavaScript/TypeScript

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

Clone the repository:
```bash
git clone https://github.com/yourusername/research-papers-dashboard.git
cd research-papers-dashboard
```

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/                      # Next.js app directory (pages, layouts)
├── components/               # Reusable UI components
│   ├── PaperCard/           # Research paper card component
│   ├── SearchBar/           # Search input with category dropdown
│   ├── Pagination/          # Pagination controls
│   ├── PaperDetailsModal/   # Modal for detailed paper view
│   ├── SkeletonCard/        # Loading skeleton component
│   └── SortControl/         # Sorting controls
├── lib/                      # Utilities and custom hooks
│   ├── api.js               # API integration functions
│   ├── utils.js             # Helper functions
│   └── useDebounce.js       # Custom debounce hook
├── styles/                   # Global styles and variables
│   ├── variables.scss       # SCSS variables for theming
│   └── mixins.scss          # Reusable SCSS mixins
└── types/                    # TypeScript types and interfaces
```

## Architecture Decisions

### Component Design

- **Modular Components**: Each component is self-contained with its own SCSS module for maintainability and reusability
- **Custom Hooks**: Created `useDebounce` for search optimization and separated API logic into utility functions
- **Separation of Concerns**: Business logic separated from UI presentation layer

### State Management

- Used React hooks (`useState`, `useEffect`, `useMemo`) for local state management
- No external state library needed due to simple app requirements
- Memoized filtered/sorted data to prevent unnecessary re-renders

### Styling Approach

- **SCSS Modules**: Component-scoped styling prevents global CSS conflicts
- **CSS Variables**: Centralized theme variables in `variables.scss` for easy customization

### Optimization Techniques

- **Client-Side Pagination**: Reduces API calls and improves overall performance
- **Debounced Search**: 300ms delay prevents excessive filtering during user typing
- **Memoization**: `useMemo` for filtered results, `useCallback` for stable function references
- **Skeleton Loaders**: Improves perceived performance during data loading states
- **Lazy Loading**: Modal components loaded only when needed to reduce initial bundle size

## Development Timeline

### Hour 1 (0:00 - 1:00)
Project setup, Next.js initialization, SCSS configuration, and API endpoint testing

### Hour 2 (1:00 - 2:00)
API integration, data fetching logic, and error/loading state handling

### Hour 3 (2:00 - 3:00)
Card component development, grid layout, and basic UI structure

### Hour 4 (3:00 - 4:00)
Search bar with category dropdown and filtering logic implementation

### Hour 5 (4:00 - 5:00)
Sorting controls, pagination implementation, and detail modal

### Hour 6 (5:00 - 6:00)
Debounced search, skeleton loaders, responsive design, and final optimizations

## API Details

**Endpoint**: `https://easydash.enago.com/acceptedpapers`

The application fetches research paper data including:
- Title
- Authors
- Year
- Journal Name
- DOI
- Impact Factor
- PDF/Media Links
