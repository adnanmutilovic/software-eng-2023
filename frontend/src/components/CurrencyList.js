import React, { useState, useEffect } from "react";
import { getCurrencyList } from "../api/currencyApi";

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencyList = await getCurrencyList();
        setCurrencies(currencyList);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div>
      <h2>Currency List</h2>
      <ul>
        {currencies.map((currency) => (
          <li key={currency}>{currency}</li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyList;
