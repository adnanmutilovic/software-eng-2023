import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/exchange-history",
});

const getAllExchangeHistory = async () => {
  const token = localStorage.getItem('token');
  
  if(!token){
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await instance.get("/", config);
  return response.data;
};

const createExchangeHistory = async (exchangeHistory) => {
  const token = localStorage.getItem('token');
  
  if(!token){
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await instance.post("/", exchangeHistory, config);
  return response.data;
};

const exchangeHistoryApi = {
  getAllExchangeHistory,
  createExchangeHistory,
};

export default exchangeHistoryApi;
