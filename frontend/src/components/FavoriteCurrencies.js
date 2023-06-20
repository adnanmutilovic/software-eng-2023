import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";

const FavoriteCurrencies = () => {
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([]);

  useEffect(() => {
    const fetchFavoriteCurrencies = async () => {
      const favorites = await userApi.getFavoriteCurrencies();
      setFavoriteCurrencies(favorites);
    };
    fetchFavoriteCurrencies();
  }, []);

  const removeFromFavorites = async (currencyId) => {
    await userApi.removeCurrencyFromFavorites(currencyId);
    setFavoriteCurrencies(
      favoriteCurrencies.filter((currency) => currency._id !== currencyId)
    );
  };

  return (
    <div className="favorite-currencies-container">
      <h2>Favorite Currencies</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Value (USD)</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favoriteCurrencies.map((currency) => (
            <tr key={currency.code}>
              <td>{currency.code}</td>
              <td>{currency.name}</td>
              <td>{currency.value.toFixed(4)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromFavorites(currency._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteCurrencies;
