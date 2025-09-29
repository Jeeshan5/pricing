const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// ==================== CONFIGURATION CLASS ====================
class RoutingConfig {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const configPath = path.join(__dirname, 'config', 'routing-config.json');
      const configData = fs.readFileSync(configPath, 'utf8');
      console.log('✅ Loaded routing configuration from file');
      return JSON.parse(configData);
    } catch (error) {
      console.warn('⚠️  Config file not found, using default configuration');
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      enabled: true,
      description: "Blue-Green deployment routing configuration",
      rules: [
        {
          type: 'cookie',
          cookieName: 'pricing_version',
          description: 'Sticky session based on existing cookie',
          priority: 4,
          enabled: true
        },
        {
          type: 'header',
          headerName: 'X-Version',
          blueValue: 'blue',
          greenValue: 'green',
          description: 'Header-based routing for testing',
          priority: 3,
          enabled: true
        },
        {
          type: 'ip',
          blueIPs: ['127.0.0.1', '::1'],
          greenIPs: [],
          description: 'IP-based routing for specific clients',
          priority: 2,
          enabled: true
        },
        {
          type: 'percentage',
          bluePercentage: 70,
          greenPercentage: 30,
          description: 'Traffic split - 70% blue, 30% green',
          priority: 1,
          enabled: true
        }
      ],
      fallback: 'blue'
    };
  }

  getRules() {
    // Sort by priority (higher number = higher priority)
    return this.config.rules
      .filter(rule => rule.enabled !== false)
      .sort((a, b) => b.priority - a.priority);
  }

  getConfig() {
    return this.config;
  }
}

// ==================== PRICING DATA LOADER CLASS ====================
class PricingDataLoader {
  constructor() {
    this.blueData = null;
    this.greenData = null;
    this.loadPricingData();
  }

  loadPricingData() {
    try {
      // Changed from 'blue.json' to 'pricing-blue.json' to match your file names
      const bluePath = path.join(__dirname, 'data', 'pricing-blue.json');
      const greenPath = path.join(__dirname, 'data', 'pricing-green.json');
      
      this.blueData = JSON.parse(fs.readFileSync(bluePath, 'utf8'));
      this.greenData = JSON.parse(fs.readFileSync(greenPath, 'utf8'));
      
      console.log('✅ Loaded pricing data from JSON files');
      console.log(`   - Blue version: ${this.blueData.plans.length} plans`);
      console.log(`   - Green version: ${this.greenData.plans.length} plans`);
    } catch (error) {
      console.warn('⚠️  Pricing data files not found, using default data');
      console.error('   Error:', error.message);
      this.blueData = this.getDefaultBlueData();
      this.greenData = this.getDefaultGreenData();
    }
  }

  getDefaultBlueData() {
    return {
      version: "blue",
      title: "Choose Your Perfect Plan",
      subtitle: "Get started with our flexible pricing options",
      badge: "Most Popular",
      plans: [
        {
          id: "basic",
          name: "Basic",
          price: 9.99,
          originalPrice: 14.99,
          period: "month",
          description: "Perfect for individuals",
          features: [
            "Up to 5 projects",
            "10GB storage",
            "Email support",
            "Basic analytics"
          ],
          popular: false,
          buttonText: "Get Started",
          color: "blue",
          savings: "Save 33%"
        },
        {
          id: "professional",
          name: "Professional",
          price: 29.99,
          originalPrice: 39.99,
          period: "month",
          description: "Best for small teams",
          features: [
            "Unlimited projects",
            "100GB storage",
            "Priority support",
            "Advanced analytics",
            "Team collaboration",
            "Custom integrations"
          ],
          popular: true,
          buttonText: "Start Free Trial",
          color: "purple",
          savings: "Save 25%"
        },
        {
          id: "enterprise",
          name: "Enterprise",
          price: 99.99,
          originalPrice: 129.99,
          period: "month",
          description: "For large organizations",
          features: [
            "Everything in Pro",
            "Unlimited storage",
            "24/7 phone support",
            "Custom reporting",
            "SSO integration",
            "Dedicated account manager"
          ],
          popular: false,
          buttonText: "Contact Sales",
          color: "gray",
          savings: "Save 23%"
        }
      ],
      features: {
        title: "Everything you need to succeed",
        items: [
          { name: "Project Management", description: "Organize and track projects", icon: "📋" },
          { name: "Team Collaboration", description: "Work together seamlessly", icon: "👥" },
          { name: "Analytics", description: "Data-driven decisions", icon: "📊" },
          { name: "Security", description: "Enterprise-grade security", icon: "🔒" }
        ]
      },
      testimonials: [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Product Manager",
          company: "TechCorp",
          content: "This platform has transformed how our team collaborates.",
          rating: 5,
          avatar: "👩‍💼"
        }
      ],
      faq: [
        {
          question: "Can I change plans anytime?",
          answer: "Yes, you can upgrade or downgrade anytime."
        }
      ]
    };
  }

  getDefaultGreenData() {
    return {
      version: "green",
      title: "New & Improved Pricing",
      subtitle: "Experience our enhanced plans with better value",
      badge: "New Release",
      plans: [
        {
          id: "starter",
          name: "Starter",
          price: 7.99,
          originalPrice: 12.99,
          period: "month",
          description: "Great for beginners",
          features: [
            "Up to 3 projects",
            "5GB storage",
            "Community support",
            "Basic templates"
          ],
          popular: false,
          buttonText: "Try Free",
          color: "green",
          savings: "Save 38%"
        },
        {
          id: "growth",
          name: "Growth",
          price: 24.99,
          originalPrice: 34.99,
          period: "month",
          description: "Perfect for growing teams",
          features: [
            "Up to 25 projects",
            "50GB storage",
            "Priority email support",
            "Advanced templates",
            "Team workspaces",
            "API access"
          ],
          popular: true,
          buttonText: "Start Growing",
          color: "emerald",
          savings: "Save 29%"
        },
        {
          id: "scale",
          name: "Scale",
          price: 79.99,
          originalPrice: 109.99,
          period: "month",
          description: "For scaling businesses",
          features: [
            "Unlimited projects",
            "500GB storage",
            "24/7 chat support",
            "Custom branding",
            "Advanced permissions", 
            "White-label solutions"
          ],
          popular: false,
          buttonText: "Scale Now",
          color: "indigo",
          savings: "Save 27%"
        }
      ],
      features: {
        title: "Powerful features for modern teams",
        items: [
          { name: "Smart Workflows", description: "Automate tasks", icon: "⚡" },
          { name: "Real-time Sync", description: "Stay in sync", icon: "🔄" },
          { name: "Advanced Analytics", description: "AI-powered insights", icon: "🎯" },
          { name: "Enterprise Security", description: "Bank-level security", icon: "🛡️" }
        ]
      },
      testimonials: [
        {
          id: 1,
          name: "Alex Rivera",
          role: "Creative Director",
          company: "DesignStudio",
          content: "The new Growth plan is incredible value.",
          rating: 5,
          avatar: "🎨"
        }
      ],
      faq: [
        {
          question: "What's new in these plans?",
          answer: "Better value with more storage and enhanced features."
        }
      ]
    };
  }

  getData(version) {
    return version === 'blue' ? this.blueData : this.greenData;
  }

  reloadData() {
    this.loadPricingData();
  }
}

// ==================== ROUTING LOGIC CLASS ====================
class PricingRouter {
  constructor(config, dataLoader) {
    this.config = config;
    this.dataLoader = dataLoader;
    this.stats = {
      blue: 0,
      green: 0,
      totalRequests: 0
    };
  }

  determineVersion(req) {
    const rules = this.config.getRules();
    
    console.log('\n🔄 Determining version for request...');
    console.log(`   IP: ${req.ip || req.connection.remoteAddress}`);
    console.log(`   Has Cookie: ${!!req.cookies.pricing_version}`);
    console.log(`   Cookie Value: ${req.cookies.pricing_version || 'none'}`);
    
    // Apply each rule in priority order
    for (const rule of rules) {
      console.log(`   Trying rule: ${rule.type} (priority ${rule.priority})`);
      const version = this.applyRule(rule, req);
      if (version) {
        console.log(`   ✅ Rule ${rule.type} matched! Version: ${version.toUpperCase()}\n`);
        this.updateStats(version);
        return version;
      }
      console.log(`   ⏭️  Rule ${rule.type} did not match, trying next...`);
    }
    
    // Fallback to blue if no rule matches
    const fallback = this.config.getConfig().fallback || 'blue';
    console.log(`   ⚠️  No rules matched, using fallback: ${fallback.toUpperCase()}\n`);
    this.updateStats(fallback);
    return fallback;
  }

  applyRule(rule, req) {
    switch (rule.type) {
      case 'cookie':
        return this.applyCookieRule(rule, req);
      
      case 'header':
        return this.applyHeaderRule(rule, req);
      
      case 'ip':
        return this.applyIPRule(rule, req);
      
      case 'percentage':
        return this.applyPercentageRule(rule, req);
      
      default:
        console.warn(`Unknown rule type: ${rule.type}`);
        return null;
    }
  }

  applyCookieRule(rule, req) {
    const cookieVersion = req.cookies[rule.cookieName];
    if (cookieVersion && ['blue', 'green'].includes(cookieVersion)) {
      console.log(`   🍪 Found valid cookie: ${cookieVersion}`);
      return cookieVersion;
    }
    console.log(`   🍪 No valid cookie found`);
    return null;
  }

  applyHeaderRule(rule, req) {
    const headerValue = req.headers[rule.headerName.toLowerCase()];
    if (headerValue === rule.blueValue) return 'blue';
    if (headerValue === rule.greenValue) return 'green';
    return null;
  }

  applyIPRule(rule, req) {
    const clientIP = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const normalizedIP = clientIP.replace('::ffff:', ''); // Normalize IPv4-mapped IPv6
    
    if (rule.blueIPs.includes(normalizedIP) || rule.blueIPs.includes(clientIP)) {
      return 'blue';
    }
    if (rule.greenIPs.includes(normalizedIP) || rule.greenIPs.includes(clientIP)) {
      return 'green';
    }
    return null;
  }

  applyPercentageRule(rule, req) {
    // If no cookie exists, use truly random distribution for new sessions
    // In production, you might use: IP + User-Agent + other factors for sticky behavior
    
    // Check if this is a completely new session (no cookie)
    if (!req.cookies.pricing_version) {
      // Generate random number between 0-99
      const randomValue = Math.floor(Math.random() * 100);
      console.log(`🎲 New session - Random value: ${randomValue} (Blue if < ${rule.bluePercentage})`);
      return randomValue < rule.bluePercentage ? 'blue' : 'green';
    }
    
    // For existing sessions, use IP-based hashing for consistency
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const hash = crypto.createHash('md5').update(ip).digest('hex');
    const hashValue = parseInt(hash.substring(0, 8), 16) % 100;
    
    return hashValue < rule.bluePercentage ? 'blue' : 'green';
  }

  updateStats(version) {
    this.stats[version]++;
    this.stats.totalRequests++;
  }

  getStats() {
    return {
      ...this.stats,
      bluePercentage: this.stats.totalRequests > 0 
        ? ((this.stats.blue / this.stats.totalRequests) * 100).toFixed(2) 
        : 0,
      greenPercentage: this.stats.totalRequests > 0 
        ? ((this.stats.green / this.stats.totalRequests) * 100).toFixed(2) 
        : 0
    };
  }

  resetStats() {
    this.stats = { blue: 0, green: 0, totalRequests: 0 };
  }
}

// ==================== REQUEST LOGGER CLASS ====================
class RequestLogger {
  static log(req, version, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      version: version,
      path: req.path,
      method: req.method,
      headers: {
        'x-version': req.headers['x-version'],
        'x-forwarded-for': req.headers['x-forwarded-for']
      },
      cookies: req.cookies,
      ...metadata
    };
    
    console.log('📝 Request Log:', JSON.stringify(logEntry, null, 2));
  }
}

// ==================== INITIALIZE COMPONENTS ====================
console.log('🚀 Initializing Blue-Green Pricing API...\n');

const routingConfig = new RoutingConfig();
const pricingDataLoader = new PricingDataLoader();
const pricingRouter = new PricingRouter(routingConfig, pricingDataLoader);

console.log('\n✅ All components initialized successfully!\n');

// ==================== API ROUTES ====================

// Main pricing endpoint
app.get('/api/pricing', (req, res) => {
  try {
    // Determine version based on routing rules
    const version = pricingRouter.determineVersion(req);
    
    // Get pricing data
    const pricingData = pricingDataLoader.getData(version);
    
    // Set sticky session cookie (24 hours)
    res.cookie('pricing_version', version, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    });
    
    // Log request
    RequestLogger.log(req, version, { 
      appliedVersion: version,
      hasExistingCookie: !!req.cookies.pricing_version,
      rule: 'Applied routing rules'
    });
    
    // Return pricing data with metadata
    res.json({
      ...pricingData,
      metadata: {
        version,
        timestamp: new Date().toISOString(),
        sessionId: crypto.randomUUID()
      }
    });
    
  } catch (error) {
    console.error('❌ Error serving pricing data:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to load pricing data'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// Configuration endpoint (for debugging)
app.get('/api/config', (req, res) => {
  res.json({
    rules: routingConfig.getRules(),
    config: routingConfig.getConfig(),
    timestamp: new Date().toISOString()
  });
});

// Statistics endpoint
app.get('/api/admin/stats', (req, res) => {
  res.json({
    stats: pricingRouter.getStats(),
    timestamp: new Date().toISOString()
  });
});

// Clear cookies endpoint (for testing)
app.post('/api/admin/clear-cookies', (req, res) => {
  res.clearCookie('pricing_version');
  res.json({ 
    message: 'Cookie cleared successfully',
    timestamp: new Date().toISOString()
  });
});

// Force version endpoint (for testing)
app.get('/api/admin/force-version/:version', (req, res) => {
  const version = req.params.version;
  
  if (!['blue', 'green'].includes(version)) {
    return res.status(400).json({ 
      error: 'Invalid version',
      message: 'Version must be either "blue" or "green"'
    });
  }
  
  res.cookie('pricing_version', version, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
  });
  
  res.json({ 
    message: `Version forced to ${version}`,
    version: version,
    timestamp: new Date().toISOString()
  });
});

// Reset statistics
app.post('/api/admin/reset-stats', (req, res) => {
  pricingRouter.resetStats();
  res.json({ 
    message: 'Statistics reset successfully',
    timestamp: new Date().toISOString()
  });
});

// Reload data endpoint (for testing)
app.post('/api/admin/reload-data', (req, res) => {
  try {
    pricingDataLoader.reloadData();
    res.json({ 
      message: 'Pricing data reloaded successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to reload data',
      message: error.message
    });
  }
});


// Export for testing
module.exports = app;