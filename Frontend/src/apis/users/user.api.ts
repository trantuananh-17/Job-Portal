import { API_PATHS } from '@utils/apiPath';
import axiosInstance from '@utils/axiosInstance';
import type { IUpdateUserByAdmin } from './interfaces/user.interface';

export const getAllUserByAdmin = async (page: number, limit: number = 8) => {
  const data = await axiosInstance.get(`${API_PATHS.USERS.ADMIN.GET_ALL}?page=${page}&limit=${limit}`);

  return data;
};

export const updateByAdmin = async (userId: number, payload: IUpdateUserByAdmin) => {
  const data = await axiosInstance.patch(`${API_PATHS.COMPANIES.ADMIN.BASE}/${userId}/update`, payload);

  return data;
};

export const softDeleteByAdmin = async (userId: number) => {
  const data = await axiosInstance.patch(`${API_PATHS.COMPANIES.ADMIN.BASE}/${userId}/delete`);

  return data;
};
