import { API_PATHS } from '@utils/apiPath';
import axiosAuth from '@utils/axiosAuth';

export const searchJobCompletionApi = (q: string) => {
  const response = axiosAuth.get(`${API_PATHS.JOBS.SEARCH_COMPLETE}?q=${encodeURIComponent(q)}`);

  return response;
};
