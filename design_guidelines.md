# Smart Temple Crowd Management - Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from **productivity tools** (Linear, Notion) for the admin dashboard and **travel/booking platforms** (Airbnb, Booking.com) for the devotee mobile app to balance utility with user engagement.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Brand Primary: 25 85% 45% (Deep saffron/temple orange)
- Dark Mode Primary: 25 75% 55% (Lighter saffron for contrast)

**Supporting Colors:**
- Success: 142 76% 36% (Temple green for confirmations)
- Warning: 38 92% 50% (Amber for capacity alerts)
- Error: 0 84% 60% (Red for critical alerts)
- Neutral Dark: 220 13% 18% (Dashboard backgrounds)
- Neutral Light: 0 0% 98% (Light mode backgrounds)

### B. Typography
**Font System:** Inter (Google Fonts)
- Headers: Inter 600-700 (Semibold-Bold)
- Body: Inter 400-500 (Regular-Medium)
- Captions: Inter 400 (Regular, smaller sizes)

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 8, 12, 16
- Micro spacing: p-2, m-2 (8px)
- Component spacing: p-4, gap-4 (16px) 
- Section spacing: p-8, my-8 (32px)
- Large spacing: p-12, my-16 (48px, 64px)

### D. Component Library

**Admin Dashboard:**
- **Navigation:** Sidebar with icon + text navigation using Heroicons
- **Cards:** Elevated cards with subtle shadows for metrics display
- **Charts:** Clean, minimal charts using Recharts with brand color scheme
- **Tables:** Zebra striping with hover states for data tables
- **Forms:** Outlined inputs with focus states in brand colors

**Mobile App (Flutter):**
- **Bottom Navigation:** Material Design 3 style with temple iconography
- **Booking Cards:** Card-based slot selection with clear capacity indicators
- **QR Display:** Prominent, centered QR codes with decorative temple borders
- **Status Indicators:** Color-coded queue status with clear typography

**Shared Elements:**
- **Buttons:** Primary (filled), Secondary (outlined), Text buttons
- **Alerts:** Toast notifications with appropriate color coding
- **Loading States:** Skeleton screens and progress indicators
- **Empty States:** Friendly illustrations with helpful messaging

### E. Visual Treatments

**Gradients:** Subtle radial gradients from primary orange to warm amber for hero sections and important CTAs. Background gradients using 25 75% 55% to 35 65% 45% for depth.

**Contrast Strategy:** High contrast for critical information (queue numbers, capacity alerts), moderate contrast for supporting content.

**Background Treatments:** Subtle geometric patterns inspired by temple architecture for empty states and loading screens.

## Platform-Specific Considerations

**Admin Dashboard:** Clean, data-focused interface with generous whitespace. Dashboard cards use soft shadows and clear hierarchy. Charts and heatmaps prominently display real-time crowd data.

**Mobile App:** Touch-friendly interface with large tap targets. Booking flow emphasizes visual slot selection with clear capacity indicators. QR code display is prominent and easily scannable.

**AI Integration:** Real-time updates reflected through smooth transitions and live indicators without overwhelming the interface.

## Images
**Temple Architecture References:** Use traditional Indian temple imagery for app backgrounds and decorative elements. Hero sections should feature peaceful temple courtyards or architectural details as background images with subtle overlays.

**No Large Hero Images:** Focus on clean, functional layouts rather than large hero sections to prioritize usability and information density.