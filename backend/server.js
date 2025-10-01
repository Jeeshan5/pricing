const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pricingRoutes = require('./routes/pricing');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://pricing-q7wh-845xjefie-jeeshan5s-projects.vercel.app' // deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/pricing', pricingRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
