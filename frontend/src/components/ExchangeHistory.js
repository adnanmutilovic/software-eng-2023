import React, { useState, useEffect } from "react";
import exchangeHistoryApi from "../auth/exchangeHistoryApi";

const ExchangeHistory = () => {
  const [exchangeHistory, setExchangeHistory] = useState([]);

  useEffect(() => {
    const fetchExchangeHistory = async () => {
      const history = await exchangeHistoryApi.getAllExchangeHistory();
      setExchangeHistory(history);
    };
    fetchExchangeHistory();
  }, []);

  return (
    <div className="exchange-history-container">
      <h2>Exchange History</h2>
      <table className="table">
       <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Amount</th>
            <th scope="col">Converted Amount</th>
            <th scope="col">Conversion Rate</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {exchangeHistory.map((exchange) => (
            <tr key={exchange._id}>
              <td>{exchange.baseCurrency}</td>
              <td>{exchange.targetCurrency}</td>
              <td>{exchange.baseAmount}</td>
              <td>{exchange.targetAmount}</td> 
              <td>{exchange.conversionRate}</td> 
              <td>{new Date(exchange.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeHistory;
