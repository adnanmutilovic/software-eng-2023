import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

const register = async (userData) => {
  const response = await instance.post("/register", userData);
  return response.data;
};

const login = async (userData) => {
  const { data } = await instance.post("/login", userData);
  return data;
};

const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  
  if(!token){
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await instance.get("/profile", config);
  return response.data;
};

const getFavoriteCurrencies = async () => {
  const token = localStorage.getItem('token');
  
  if(!token){
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await instance.get("/favorites", config);
  return response.data;
};

const removeCurrencyFromFavorites = async (currencyId) => {
  const token = localStorage.getItem('token');
  
  if(!token){
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await instance.delete(`/favorites/${currencyId}`, config);
  return response.data;
};

const userApi = {
  register,
  login,
  getUserProfile,
  getFavoriteCurrencies,
  removeCurrencyFromFavorites,
};

export default userApi;
