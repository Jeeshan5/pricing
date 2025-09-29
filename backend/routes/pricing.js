const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pricingRouter = require('../services/PricingRouter');
const dataLoader = require('../services/PricingDataLoader');
const logger = require('../services/RequestLogger');
const config = require('../config');

router.get('/', (req, res) => {
  try {
    const version = pricingRouter.determineVersion(req);
    const pricingData = dataLoader.getData(version);
    
    res.cookie('pricing_version', version, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    });
    
    logger.log(req, version);
    
    res.json({
      ...pricingData,
      metadata: {
        version,
        timestamp: new Date().toISOString(),
        sessionId: crypto.randomUUID()
      }
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Failed to load pricing data' });
  }
});

router.get('/config', (req, res) => {
  res.json({
    rules: config.getRules(),
    config: config.getConfig()
  });
});

module.exports = router;