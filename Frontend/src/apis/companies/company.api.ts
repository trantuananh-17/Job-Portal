import { API_PATHS } from '@utils/apiPath';
import axiosInstance from '@utils/axiosInstance';
import type { IUpdateCompanyPayload } from './interfaces/company.interface';

export const getProfileCompany = async () => {
  const data = await axiosInstance.get(`${API_PATHS.COMPANIES.GET_COMPANY_PROFILE}`);

  return data;
};

export const updateProfileCompany = async (company: IUpdateCompanyPayload) => {};
