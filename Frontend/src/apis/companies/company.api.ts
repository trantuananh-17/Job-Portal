import { API_PATHS } from '@utils/apiPath';
import axiosInstance from '@utils/axiosInstance';
import type { IUpdateCompanyPayload } from './interfaces/company.interface';

export const getProfileCompany = async () => {
  const data = await axiosInstance.get(`${API_PATHS.COMPANIES.BASE}`);

  return data;
};

export const updateProfileCompany = async (company: IUpdateCompanyPayload) => {};

export const getAllCompaniesByAdmin = async (page: number, limit: number = 8) => {
  const data = await axiosInstance.get(`${API_PATHS.COMPANIES.ADMIN.GET_ALL}?page=${page}&limit=${limit}`);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return data;
};

export const updateStatusByAdmin = async (id: number, status: string) => {
  const data = await axiosInstance.patch(`${API_PATHS.COMPANIES.ADMIN.BASE}/${id}/status`, { status });

  return data;
};

export const restoreByAdmin = async (id: number) => {
  const data = await axiosInstance.patch(`${API_PATHS.COMPANIES.ADMIN.BASE}/${id}/restore`);

  return data;
};

export const softDeleteByAdmin = async (id: number) => {
  const data = await axiosInstance.patch(`${API_PATHS.COMPANIES.ADMIN.BASE}/${id}/soft-delete`);

  return data;
};
