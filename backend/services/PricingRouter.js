const crypto = require('crypto');

class PricingRouter {
  constructor(config) {
    this.config = config;
    this.stats = { blue: 0, green: 0, totalRequests: 0 };
  }

  determineVersion(req) {
    const rules = this.config.getRules();
    
    for (const rule of rules) {
      const version = this.applyRule(rule, req);
      if (version) {
        this.updateStats(version);
        return version;
      }
    }
    
    const fallback = this.config.getConfig().fallback || 'blue';
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
        return null;
    }
  }

  applyCookieRule(rule, req) {
    const cookieVersion = req.cookies[rule.cookieName];
    return ['blue', 'green'].includes(cookieVersion) ? cookieVersion : null;
  }

  applyHeaderRule(rule, req) {
    const headerValue = req.headers[rule.headerName.toLowerCase()];
    if (headerValue === rule.blueValue) return 'blue';
    if (headerValue === rule.greenValue) return 'green';
    return null;
  }

  applyIPRule(rule, req) {
    const clientIP = (req.ip || req.connection.remoteAddress || '127.0.0.1')
      .replace('::ffff:', '');
    
    if (rule.blueIPs.includes(clientIP)) return 'blue';
    if (rule.greenIPs.includes(clientIP)) return 'green';
    return null;
  }

  applyPercentageRule(rule, req) {
    if (!req.cookies.pricing_version) {
      const randomValue = Math.floor(Math.random() * 100);
      return randomValue < rule.bluePercentage ? 'blue' : 'green';
    }
    
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
        ? ((this.stats.blue / this.stats.totalRequests) * 100).toFixed(2) : 0,
      greenPercentage: this.stats.totalRequests > 0 
        ? ((this.stats.green / this.stats.totalRequests) * 100).toFixed(2) : 0
    };
  }

  resetStats() {
    this.stats = { blue: 0, green: 0, totalRequests: 0 };
  }
}

const config = require('../config');
module.exports = new PricingRouter(config);