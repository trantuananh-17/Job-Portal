import { SearchRequest } from 'node_modules/@elastic/elasticsearch/lib/api/types';

class JobQuery {
  searchMany(): SearchRequest {
    return {
      index: 'jobs',
      from: 0,
      size: 2,
      query: {
        prefix: {
          title: 'hir'
        }
      },
      sort: [
        {
          minSalary: {
            order: 'asc'
          }
        }
      ]
    };
  }

  searchQuery(): SearchRequest {
    return {
      index: 'jobs',
      query: {
        bool: {
          filter: [
            {
              term: {
                status: 'ACTIVE'
              }
            }
          ]
        }
      }
    };
  }
}

export const jobQuery: JobQuery = new JobQuery();
