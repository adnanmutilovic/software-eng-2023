import React, { useState, useEffect } from "react";
import { getCurrencyList, convertCurrency } from "../api/currencyApi";
import exchangeHistoryApi from "../api/exchangeHistoryApi";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencyList = await getCurrencyList();
        setCurrencies(currencyList);
        console.log("Fetched currencies:", currencyList);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

const handleConvert = async () => {
  console.log("fromCurrency:", fromCurrency);
  console.log("toCurrency:", toCurrency);
  console.log("amount:", amount);

  if (!fromCurrency || !toCurrency) {
    console.error('You must select both a "from" and "to" currency');
    return;
  }

  try {
    const result = await convertCurrency(fromCurrency, toCurrency, amount);
    setConvertedAmount(result.convertedAmount);

    const exchangeHistory = {
      baseCurrency: fromCurrency,
      targetCurrency: toCurrency,
      baseAmount: amount,
      targetAmount: result.convertedAmount,
      conversionRate: result.convertedAmount / amount,
    };

    await exchangeHistoryApi.createExchangeHistory(exchangeHistory);
    console.log("Exchange history record created successfully");

  } catch (error) {
    console.error("Error converting currency:", error);
  }
};

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option>Select a currency</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option>Select a currency</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount && (
        <p>
          {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
