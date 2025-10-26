export const BASE_URL = 'http://localhost:5000';

export const API_PATHS = {
  AUTH: {
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    GET_PROFILE: '/api/v1/auth/me',
    REFRESH_TOKEN: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout'
  },
  JOBS: {
    SEARCH_COMPLETE: 'api/v1/jobs/search',
    GET_JOBS_BY_CANDIDATE: 'api/v1/jobs',
    GET_JOBS_BY_RECRUITER: 'api/v1/jobs/me',
    GET_JOB_BY_ID_FOR_CANDIDATE: 'api/v1/jobs',
    GET_JOB_BY_ID_FOR_RECRUITER: 'api/v1/jobs/recruiter',
    GET_JOBS_BY_ADMIN: 'api/v1/jobs/admin/get-all',
    GET_JOB_BY_ADMIN: 'api/v1/jobs/admin/',
    SEARCH_JOBS_FILTER: 'api/v1/jobs/es/search',
    CREATE_JOB: 'api/v1/jobs',
    UPDATE_JOB: 'api/v1/jobs',
    DELETE_JOB_BY_RECRUITER: 'api/v1/jobs',
    DELETE_JOB_BY_ADMIN: 'api/v1/jobs/admin'
  },
  COMPANIES: {
    GET_COMPANY_PROFILE: 'api/v1/companies/auth/me',
    GET_ALL_BY_ADMIN: 'api/v1/companies/admin/get-all'
  }
};
