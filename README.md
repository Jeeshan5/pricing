Blue-Green Pricing Deployment System
A full-stack application demonstrating Blue-Green deployment strategy for A/B testing different pricing plans. The system intelligently routes users between two pricing versions using configurable rules and tracks performance metrics in real-time.
Features

Blue-Green Deployment: Test two different pricing strategies simultaneously
Smart Routing: Multiple routing strategies (cookie-based, header-based, IP-based, percentage split)
Sticky Sessions: Users see consistent pricing across visits
Real-time Statistics: Track traffic distribution between versions
Admin Tools: Force versions, clear cookies, and reset stats
Modular Architecture: Clean separation of concerns for easy maintenance

Tech Stack
Backend:

Node.js + Express
Cookie-based session management
JSON file-based data storage
Modular service architecture

Frontend:

React 18
Tailwind CSS
Lucide React (icons)
Framer Motion (animations)

Project Structure
pricing-project/
├── backend/
│   ├── config/
│   │   ├── index.js              # Configuration loader
│   │   └── routing-config.json   # Routing rules
│   ├── data/
│   │   ├── blue.json            # Blue version pricing
│   │   └── green.json           # Green version pricing
│   ├── routes/
│   │   ├── pricing.js           # Pricing endpoints
│   │   └── admin.js             # Admin endpoints
│   ├── services/
│   │   ├── PricingRouter.js     # Routing logic
│   │   ├── PricingDataLoader.js # Data management
│   │   └── RequestLogger.js     # Request logging
│   ├── server.js                # Main entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── PricingCard.jsx
    │   │   └── Footer.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
