const cron = require('node-cron');
const { updateRates } = require('./rateUpdater');

// Update rates every minute for testing
cron.schedule('* * * * *', () => {
  console.log('Updating currency rates...');
  updateRates();
});
