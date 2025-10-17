import { API_PATHS } from '@utils/apiPath';
import axiosAuth from '@utils/axiosAuth';
import type { IJobCreate, IJobPayloadCreate, JobStatus } from './interfaces/job.interface';
import axiosInstance from '@utils/axiosInstance';

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

export const createJobApi = async (payload: IJobPayloadCreate) => {
  const response = await axiosInstance.post(`${API_PATHS.JOBS.CREATE_JOB}`, payload);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return response;
};

export const getJobsByRecruiterApi = async (page: number, status: JobStatus) => {
  const respone = await axiosInstance.get(`${API_PATHS.JOBS.GET_JOBS_BY_RECRUITER}?page=${page}&status=${status}`);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return respone;
};

export const getJobByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`${API_PATHS.JOBS.GET_JOB_BY_ID}/${id}`);

  return response;
};
