const fs = require('fs');
const path = require('path');

class PricingDataLoader {
  constructor() {
    this.loadData();
  }

  loadData() {
    try {
      const bluePath = path.join(__dirname, '../data/blue.json');
      const greenPath = path.join(__dirname, '../data/green.json');
      
      this.blueData = JSON.parse(fs.readFileSync(bluePath, 'utf8'));
      this.greenData = JSON.parse(fs.readFileSync(greenPath, 'utf8'));
      
      console.log('✅ Loaded pricing data');
    } catch (error) {
      console.error('❌ Error loading pricing data:', error.message);
      throw error;
    }
  }

  getData(version) {
    return version === 'blue' ? this.blueData : this.greenData;
  }

  reloadData() {
    this.loadData();
  }
}

module.exports = new PricingDataLoader();