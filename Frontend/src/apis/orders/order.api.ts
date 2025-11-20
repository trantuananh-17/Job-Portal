import { API_PATHS } from '@utils/apiPath';
import axiosInstance from '@utils/axiosInstance';

export const getAllOrderByadmin = async (page: number, limit: number = 8) => {
  const data = await axiosInstance.get(`${API_PATHS.ORDER.ADMIN.GET_ALL}?page=${page}&limit=${limit}`);

  return data;
};
