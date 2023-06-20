import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/currency";

export const getCurrencyList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getCurrencyList,
  convertCurrency,
};
