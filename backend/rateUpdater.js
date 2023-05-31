const axios = require('axios');
const Currency = require('./models/Currency');

const updateRates = async () => {
  try {
    const response = await axios.get('https://api.freecurrencyapi.com/v1/latest?apikey=pZxEK9K0Uftr2CZl83tVnNpw9voA9aL3lfxrF79T');

    for (let code in response.data.data) {
      await Currency.updateOne({ code: code }, { rate: response.data.data[code] });
    }

    console.log('Currency rates updated successfully');
  } catch (error) {
    console.error('Error updating rates:', error);
  }
};

module.exports = {
  updateRates,
};
