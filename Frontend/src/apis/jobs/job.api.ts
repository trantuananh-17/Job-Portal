import { API_PATHS } from '@utils/apiPath';
import axiosAuth from '@utils/axiosAuth';
import type { IJobPayloadCreate, IJobPayloadUpdate, JobStatus } from './interfaces/job.interface';
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

export const getJobsByRecruiterApi = async (page: number, status: JobStatus) => {
  const respone = await axiosInstance.get(`${API_PATHS.JOBS.GET_JOBS_BY_RECRUITER}?page=${page}&status=${status}`);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return respone;
};

export const getJobByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`${API_PATHS.JOBS.GET_JOB_BY_ID_FOR_RECRUITER}/${id}`);

  return response;
};

export const getJobsByAdmin = async (page: number, limit: number = 5, status: JobStatus, q?: string) => {
  const response = await axiosInstance.get(
    `${API_PATHS.JOBS.GET_JOBS_BY_ADMIN}?page=${page}&limit=${limit}&q=${q}&status=${status}`
  );

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return response;
};

export const getJobByAdmin = async (id: number) => {
  const response = await axiosInstance.get(`${API_PATHS.JOBS.GET_JOB_BY_ADMIN}/${id}`);

  return response;
};

export const createJobApi = async (payload: IJobPayloadCreate) => {
  const response = await axiosInstance.post(`${API_PATHS.JOBS.CREATE_JOB}`, payload);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return response;
};

export const updateJobApi = async (payload: IJobPayloadUpdate, companyId: number, jobId: number) => {
  const response = await axiosInstance.patch(`${API_PATHS.JOBS.UPDATE_JOB}/${jobId}/${companyId}`, payload);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return response;
};

export const updateStatusJobApi = async (jobId: number, status: JobStatus) => {
  const response = await axiosInstance.patch(`${API_PATHS.JOBS.UPDATE_JOB}/${jobId}/status`, { status });

  return response;
};

export const deleteJobApi = async (companyId: number, jobId: number) => {
  const response = await axiosInstance.delete(`${API_PATHS.JOBS.DELETE_JOB_BY_RECRUITER}/${jobId}/${companyId}`);

  return response;
};

export const deleteJobByAdminApi = async (jobId: number) => {
  const response = await axiosInstance.delete(`${API_PATHS.JOBS.DELETE_JOB_BY_ADMIN}/${jobId}`);

  return response;
};
