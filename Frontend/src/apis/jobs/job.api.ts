import { API_PATHS } from '@utils/apiPath';
import axiosAuth from '@utils/axiosAuth';

export const searchJobCompletionApi = async (q: string) => {
  const response = await axiosAuth.get(`${API_PATHS.JOBS.SEARCH_COMPLETE}?q=${encodeURIComponent(q)}`);

  return response;
};

export const getJobsByCandidateApi = async (page: number, limit: number) => {
  const data = await axiosAuth.get(`${API_PATHS.JOBS.GET_JOBS_BY_CANDIDATE}?page=${page}&limit=${limit}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export const searchJobsFilterApi = async (limit: number = 6, params: URLSearchParams) => {
  const data = await axiosAuth.get(`${API_PATHS.JOBS.SEARCH_JOBS_FILTER}?limit=${limit}&${params.toString()}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};
