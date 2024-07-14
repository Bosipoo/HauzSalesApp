import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://hauzapi.azurewebsites.net/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add token to each request
  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      if (token && !['/UserAccount/Login', '/UserAccount/SignUp', '/UserAccount/SignOut'].includes(config.url)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle session expiration
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        Cookies.remove('token');
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export const login = async (email, password) => {
    try {
      const response = await api.post('/UserAccount/Login', { email, password });
      console.log("Response", response);
      return response.data;
    } catch (error) {
      console.log("Login Error:", error)
      throw error.response.data? error.response.data : new Error('Login failed');
    }
  };

  export const signUp = async (userData) => {
    try {
      const response = await api.post(`/UserAccount/SignUp?role=Admin`, userData);
      console.log("Response: ", response);
      return response.data;
    } catch (error) {
      console.log("Signup Error:", error)
      throw error.response ? error.response.data : new Error('Signup failed');
    }
  };

  export const addLedger = async (ledgerData) => {
    try {
      console.log("Ledger Data", ledgerData);
      const response = await api.post('/AddLedger', ledgerData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  export const getLedgers = async () => {
    const response = await api.get('/GetLedgers');
    return response.data;
  };


