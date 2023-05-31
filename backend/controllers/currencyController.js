const Currency = require("../models/Currency");

const getCurrencyList = async (req, res) => {
  try {
    const currencies = await Currency.find().select("code rate");
    const currencyCodes = currencies.map((currency) => currency.code);
    
    console.log('Currencies:', currencyCodes);
    
    res.status(200).json(currencyCodes);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};


const convertCurrency = async (req, res) => {
  const { from, to } = req.query;
  let { amount } = req.query;

  // Parse amount to float
  amount = parseFloat(amount);

  // Check if amount is a number
  if (isNaN(amount)) {
    res.status(400).json({ message: "Invalid amount" });
    return;
  }

  try {
    const fromCurrency = await Currency.findOne({ code: from });
    const toCurrency = await Currency.findOne({ code: to });

    if (!fromCurrency || !toCurrency) {
      res.status(400).json({ message: "Invalid currency code(s)" });
      return;
    }

    const convertedAmount = (amount / fromCurrency.rate) * toCurrency.rate;
    res.status(200).json({ convertedAmount: convertedAmount.toFixed(6) });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  getCurrencyList,
  convertCurrency,
};
