const fs = require('fs');
const path = require('path');

class RoutingConfig {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const configPath = path.join(__dirname, 'routing-config.json');
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
      console.warn('⚠️ Config file not found, using defaults');
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      enabled: true,
      rules: [
        {
          type: 'cookie',
          cookieName: 'pricing_version',
          priority: 4,
          enabled: true
        },
        {
          type: 'header',
          headerName: 'X-Version',
          blueValue: 'blue',
          greenValue: 'green',
          priority: 3,
          enabled: true
        },
        {
          type: 'ip',
          blueIPs: ['127.0.0.1', '::1'],
          greenIPs: [],
          priority: 2,
          enabled: true
        },
        {
          type: 'percentage',
          bluePercentage: 70,
          greenPercentage: 30,
          priority: 1,
          enabled: true
        }
      ],
      fallback: 'blue'
    };
  }

  getRules() {
    return this.config.rules
      .filter(rule => rule.enabled !== false)
      .sort((a, b) => b.priority - a.priority);
  }

  getConfig() {
    return this.config;
  }
}

module.exports = new RoutingConfig();