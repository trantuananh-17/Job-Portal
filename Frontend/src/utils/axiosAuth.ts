import axios from 'axios';
import { BASE_URL } from './apiPath';

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export default axiosAuth;
