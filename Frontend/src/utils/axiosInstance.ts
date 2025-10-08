import axios from 'axios';
import { BASE_URL } from './apiPath';

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
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         // Gọi API refresh token
//         await axiosInstance.get("/auth/refresh", { withCredentials: true });
//         // Gửi lại request ban đầu
//         return axiosInstance(error.config);
//       } catch {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page
      } else if (error.response.status === 500) {
        console.error('Server error. Please try again later.');
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
