# CMC Infrastructure Command

A portfolio-quality, UI-only web application for municipal asset management. Built for Colombo Municipal Council (CMC) with co-branding support for SULECO.

## Features

- **Complete Asset Management**: Roads, Drains, Streetlights, Trees, Waste Points, Public Buildings
- **Work Order Management**: Kanban and Table views with Smart Triage Mode
- **Incident Tracking**: Rapid incident logging with impact radius visualization
- **Complaint Management**: Inbox-style triage with sentiment indicators
- **City Grid Canvas**: Interactive SVG-based ward map with layer toggles
- **City Pulse Strip**: Real-time indicators for rain risk, traffic, incidents, crews, SLA breaches
- **Theme & Density Controls**: Light/Dark mode with Comfortable/Compact density options
- **Reduced Motion Support**: Accessibility-first animations
- **Virtualized Tables**: High-performance data tables for large datasets

## Tech Stack

- **Next.js 14+** (App Router) with TypeScript
- **TailwindCSS** for styling
- **shadcn/ui** (Radix UI) for components
- **lucide-react** for icons
- **recharts** for data visualization
- **@tanstack/react-table** for table functionality
- **react-hook-form + zod** for form handling
- **framer-motion** for subtle animations
- **zustand** for state management

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Route Map

### Authentication
- `/auth/sign-in` - Sign in page (UI only)

### Main Application
- `/dashboard` - Command center with KPIs, charts, and quick actions
- `/assets` - All assets overview
- `/assets/roads` - Road infrastructure
- `/assets/drains` - Drainage infrastructure
- `/assets/streetlights` - Street lighting
- `/assets/trees` - Urban trees
- `/assets/waste` - Solid waste collection points
- `/assets/buildings` - Public buildings
- `/assets/[type]/[id]` - Asset detail page with tabs

### Operations
- `/inspections` - Inspection schedule and forms
- `/work-orders` - Maintenance work orders (Kanban/Table views)
- `/incidents` - Emergency events and hazards
- `/complaints` - Citizen requests and feedback

### Resources
- `/crews` - Field teams and equipment
- `/inventory` - Materials and equipment stock
- `/contracts` - Vendor contracts and SLAs
- `/budgets` - CAPEX/OPEX tracking

### Analytics & Settings
- `/reports` - Report generation and analytics
- `/settings` - System configuration (branding, roles, notifications)
- `/help` - Knowledge base and support
- `/showcase` - Gallery of key screens

## Branding

### Logo Placeholders

The application includes placeholder logo files:
- `/public/brand/cmc-mark.svg` - CMC logo placeholder
- `/public/brand/suleco-mark.svg` - SULECO logo placeholder

### Replacing Logos

1. Replace the SVG files in `/public/brand/` with your official logos
2. Ensure logos maintain aspect ratio and are optimized for web
3. Update colors in `/src/app/globals.css` if needed
4. Use the Settings > Branding page to preview changes (UI only)

### Co-Branding

- "CMC Infrastructure Command" is the main product name
- "Powered by SULECO" appears in:
  - Footer (all pages)
  - Sign-in screen
  - Settings > Branding page

## Mock Data

The application uses generated mock data located in `/src/lib/mock/seed.ts`. This includes:
- 1,000+ assets across all types
- 2,000+ complaints
- 500 work orders
- 200 incidents
- 50 crews
- Realistic Sri Lankan ward names (generic, not politically sensitive)

## Key Components

### City Pulse Strip
Real-time indicators showing:
- Rain risk
- Traffic disruption
- Open incidents
- Active crews
- SLA breaches
- Critical assets

### City Grid Canvas
Interactive SVG-based ward map with:
- Ward selection (filters asset tables)
- Layer toggles (Roads, Drains, Lights, Trees, Waste, Buildings)
- Risk level visualization
- Coordinate display

### Data Table
Virtualized table component with:
- Search functionality
- Column sorting
- Pagination
- Row actions
- Responsive design

## Customization

### Theme Colors
Edit `/src/app/globals.css` to customize:
- Primary color (CMC blue)
- Secondary color (SULECO teal)
- Dark mode colors

### Density Modes
- **Comfortable**: Standard spacing (default)
- **Compact**: Reduced spacing for operational efficiency

### Reduced Motion
Toggle in topbar to respect `prefers-reduced-motion` for accessibility.

## Performance

- Route-level code splitting
- Dynamic imports for heavy components
- Table virtualization for large datasets
- Memoized row renderers
- Next/Image for optimized images
- Lighthouse-friendly optimizations

## Development

### Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── (main)/       # Main application routes
│   ├── auth/         # Authentication pages
│   └── layout.tsx    # Root layout
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   └── ...           # Custom components
├── lib/              # Utilities and helpers
│   ├── mock/         # Mock data generator
│   └── ...           # Utility functions
└── ...
```

### Adding New Routes

1. Create a new page in `/src/app/(main)/[route-name]/page.tsx`
2. Add navigation link in `/src/components/app-shell.tsx`
3. Update this README with the new route

## License

This is a portfolio project. All rights reserved.

## Credits

- Built with Next.js and shadcn/ui
- Icons by lucide-react
- Charts by recharts

