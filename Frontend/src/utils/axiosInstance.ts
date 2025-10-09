import axios from 'axios';
import { BASE_URL } from './apiPath';
import { refreshTokenApi } from '@apis/auth/auth.api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
});

// Refresh token
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await refreshTokenApi();

        return axiosInstance(error.config);
      } catch {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 500) {
        console.error('Server error. Please try again later.');
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
