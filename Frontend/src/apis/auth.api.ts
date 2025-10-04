import { API_PATHS } from '@utils/apiPath';
import axiosInstance from '@utils/axiosInstance';
import type { IUserLogin } from './interfaces/user.interface';

export const getCurrentUserApi = async () => {
  const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
  return response.data;
};

export const loginApi = async (data: IUserLogin) => {
  const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);
  return response;
};
