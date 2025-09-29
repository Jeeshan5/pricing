const express = require('express');
const router = express.Router();
const pricingRouter = require('../services/PricingRouter');
const dataLoader = require('../services/PricingDataLoader');

router.get('/stats', (req, res) => {
  res.json({ stats: pricingRouter.getStats() });
});

router.post('/clear-cookies', (req, res) => {
  res.clearCookie('pricing_version');
  res.json({ message: 'Cookie cleared' });
});

router.get('/force-version/:version', (req, res) => {
  const { version } = req.params;
  if (!['blue', 'green'].includes(version)) {
    return res.status(400).json({ error: 'Invalid version' });
  }
  
  res.cookie('pricing_version', version, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
  });
  
  res.json({ message: `Version forced to ${version}`, version });
});

router.post('/reset-stats', (req, res) => {
  pricingRouter.resetStats();
  res.json({ message: 'Statistics reset' });
});

router.post('/reload-data', (req, res) => {
  try {
    dataLoader.reloadData();
    res.json({ message: 'Data reloaded' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reload data' });
  }
});

module.exports = router;