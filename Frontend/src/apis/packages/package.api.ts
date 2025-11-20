import { API_PATHS } from '@utils/apiPath';
import type { ICreateAndUpdatePackage } from './interfaces/package.interface';
import axiosInstance from '@utils/axiosInstance';

export const createPackageApi = async (data: ICreateAndUpdatePackage) => {
  const response = 'Create successfully';

  return response;
};

export const updatePackageApi = async (data: ICreateAndUpdatePackage, id: number) => {
  const response = 'Update successfully';

  return response;
};

export const getAllPackageByAdmin = async (page: number, limit: number = 1) => {
  const data = await axiosInstance.get(`${API_PATHS.PACKAGES.ADMIN.GET_ALL}?page=${page}&limit=${limit}`);

  return data;
};
