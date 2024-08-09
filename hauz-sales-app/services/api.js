import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://hauzapi.azurewebsites.net/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

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

  export const getLedgerById = async (id) => {
    const response = await api.get(`/GetLedgers/${id}`);
    console.log('getbyId',response);
    return response.data;
  };

  export const addProperty = async (propertyData) => {
    try {
      const response = await api.post('/AddProperty', propertyData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to add property');
    }
  };

  export const getProperties = async () => {
    const response = await api.get('/GetProperties');
    return response.data;
  }

  export const getPropertyTypes = async () => {
    try {
      const response = await api.get('/GetPropertyType');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch property types');
    }
  };

  export const addPropertyType = async (propertyTypeData) => {
    try{
      const response = await api.post(`/AddPropertyType`, propertyTypeData);
      return response.data;
    }catch (error) {
      console.log("Add Property Error: ", error);
      throw error.response ? error.response.data : new Error('Failed to add property types');
    }
  };

  export const getSalesRep = async () => {
    try {
      const response = await api.get('/GetSalesRepresentatives');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch sales rep');
    }
  };

  export const addSalesRep = async (salesData) => {
    try{
      const response = await api.post(`/AddSalesRepresentative`, salesData);
      return response.data;
    }catch (error) {
      console.log("Add Sales Rep Error: ", error);
      throw error.response ? error.response.data : new Error('Failed to add sales representative types');
    }
  };

  export const getProspect = async () => {
    try {
      const response = await api.get('/GetProspects');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch prospects');
    }
  };

  export const addProspect = async (data) => {
    try{
      const response = await api.post(`/AddProspect`, data);
      return response.data;
    }catch (error) {
      console.log("Add Prospect Error: ", error);
      throw error.response ? error.response.data : new Error('Failed to add prospect');
    }
  };

