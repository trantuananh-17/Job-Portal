import { SearchRequest } from 'node_modules/@elastic/elasticsearch/lib/api/types';
import { IJobFilters } from '../interface/job.interface';

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

  // const filter: any[] = [];
  //   filter.push({
  //     term: { isDeleted: filters.isDeleted ?? false }
  //   });

  //   if (filters.status && filters.status !== '') {
  //     filter.push({ term: { status: filters.status } });
  //   }

  //   if (filters.jobRoleName && filters.jobRoleName !== '') {
  //     filter.push({ term: { jobRoleName: filters.jobRoleName } });
  //   }

  //   const salaryRange: any = {};
  //   if (filters.minSalary != null) salaryRange.gte = filters.minSalary;
  //   if (filters.maxSalary != null) salaryRange.lte = filters.maxSalary;
  //   if (Object.keys(salaryRange).length > 0) filter.push({ range: { minSalary: salaryRange } });

  searchComplete(page: number, limit: number, q: string): SearchRequest {
    return {
      index: 'jobs',
      from: (page - 1) * limit,
      size: limit,
      query: {
        bool: {
          must: {
            dis_max: {
              queries: [
                {
                  multi_match: {
                    query: q,
                    type: 'bool_prefix',
                    fields: ['title^3', 'title._2gram', 'title._3gram']
                  }
                },
                {
                  multi_match: {
                    query: q,
                    fields: ['title.ngram^2']
                  }
                }
              ],
              tie_breaker: 0.1
            }
          },
          should: [
            {
              match_phrase_prefix: {
                title: {
                  query: q,
                  slop: 3,
                  boost: 5
                }
              }
            }
          ]
        }
      }
    };
  }
}

export const jobQuery: JobQuery = new JobQuery();
