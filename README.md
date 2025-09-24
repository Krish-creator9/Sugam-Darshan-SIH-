# सुगम दर्शन (Sugam Darshan)

A modern crowd management and devotee experience platform for temples, built with React, Node.js, and real-time analytics.

## Overview

Sugam Darshan is a comprehensive temple management system that streamlines the devotee experience while providing administrators with powerful tools for crowd control and resource management.

## How It Works

The platform offers two main interfaces tailored to different user needs:

### 1. Devotee Interface
- **Easy Access**: Devotees can access services through a user-friendly mobile-responsive interface
- **E-Token System**: Book temple visit slots and receive QR-code based digital tokens
- **Digital Services**: Access live darshan, virtual puja, prasad booking, and parking services
- **Real-time Updates**: Get instant updates about queue status and crowd conditions
- **Smart Assistant**: AI-powered chatbot for quick help with temple-related queries
- **Multilingual Support**: Interface available in multiple Indian languages for wider accessibility

### 2. Admin Dashboard
- **Crowd Management**: Real-time analytics and heatmaps showing zone-wise temple occupancy
- **Queue Control**: Manage devotee flow and monitor entry/exit patterns
- **Slot Management**: Create and adjust time slots based on crowd patterns
- **Emergency Response**: Handle urgent situations with real-time alerts
- **Booking Management**: Overview and control of all temple visit bookings
- **Analytics**: Comprehensive metrics for better temple management

### Smart Features
- AI-powered crowd analysis for efficient space management
- Real-time heatmaps indicating zone-wise crowd density
- QR code-based entry verification system
- Intelligent queue management with digital display integration
- Automated slot allocation based on capacity and demand

### Security & Authentication
- Secure login system for both devotees and administrators
- QR code verification for entry validation
- Role-based access control for different user types
- Protected routes for administrative functions

## Features

### For Devotees 📿
- **E-Token Booking System**: Reserve visit slots with QR-code based tokens
- **Live Queue Status**: Real-time updates on current token numbers and waiting times
- **AI Chat Assistant**: Get instant answers about prasad timings, parking, and puja services
- **Virtual Puja Services**: Book and track puja services remotely
- **Multi-language Support**: Interface available in multiple Indian languages
- **Emergency Services**: Quick access to wheelchair requests and SOS features

### For Administrators 🏛️
- **Live Crowd Monitoring**: AI-powered density analysis with zone-wise heat maps
- **Queue Management**: Control token progression and manage visitor flow
- **Parking Management**: Track available spaces and adjust pricing
- **Prasad/Bhandara Management**: Update timings and manage food service schedules
- **Virtual Puja Assignment**: Assign pandits to virtual puja requests
- **Emergency Response**: Monitor and respond to assistance requests

## Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter (lightweight client-side routing)
- **UI Components**: Custom components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS Variables for theming
- **State Management**: React Context + Hooks
- **Internationalization**: i18next with JSON-based translations

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database Schema**: Drizzle ORM (PostgreSQL)
- **API Style**: RESTful with JSON
- **Build**: esbuild for server bundle

### Features Implementation
- **Real-time Updates**: Server-Sent Events (SSE) for live metrics
- **QR Generation**: Client-side QR code generation for E-tokens
- **Analytics**: Zone-based crowd density analysis
- **Chat System**: Context-aware chat bot with structured responses
- **Storage**: In-memory with persistence layer ready for DB integration

## Project Structure
\`\`\`
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components and routes
│   │   └── lib/         # Utilities and helpers
├── server/              # Backend Express application
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data storage interface
│   └── index.ts         # Server entry point
└── shared/              # Shared TypeScript types/schemas
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for production)

### Development Setup
1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd TempleFlow
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start development servers:
   \`\`\`bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   npm run server:dev
   \`\`\`

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Building for Production
\`\`\`bash
npm run build
\`\`\`

This creates:
- Frontend build in \`dist/public/\`
- Server bundle in \`dist/index.js\`

## Configuration

### Environment Variables
Create a \`.env\` file in the root directory:
\`\`\`env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/temple_db
\`\`\`

### Internationalization
Language files are located in \`client/public/locales/\`:
- English (en)
- Hindi (hi)
- Bengali (bn)
- Gujarati (gu)
- Tamil (ta)
- Telugu (te)

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Developed for Smart India Hackathon 2025
- Uses various open-source packages and tools
- Inspired by the need for better temple crowd management solutions

## Contact

For support or queries, please open an issue in the repository.