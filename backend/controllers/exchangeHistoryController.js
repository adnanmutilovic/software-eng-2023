const ExchangeHistory = require("../models/ExchangeHistory");

const getUserExchangeHistory = async (req, res) => {
  try {
    const exchangeHistory = await ExchangeHistory.find({ user: req.user._id });
    res.status(200).json(exchangeHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};


const createExchangeRecord = async (req, res) => {
  try {
    const { baseCurrency, targetCurrency, baseAmount, targetAmount, conversionRate } = req.body;

    if (!req.user) {
      throw new Error('No user found in the request');
    }

    const newExchangeRecord = new ExchangeHistory({
      user: req.user._id,
      baseCurrency,
      targetCurrency,
      baseAmount,
      targetAmount,
      conversionRate,
    });

    await newExchangeRecord.save();
    res.status(201).json(newExchangeRecord);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: `Server error: ${error.message}` }); // Send error message in response
  }
};


module.exports = {
  getUserExchangeHistory,
  createExchangeRecord,
};
