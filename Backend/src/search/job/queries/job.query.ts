import { SearchRequest } from 'node_modules/@elastic/elasticsearch/lib/api/types';
import { dateRangeMap, IJobFilters } from '../interface/job.interface';

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

  searchJobFilter(page: number, limit: number, q: string, filters: IJobFilters) {
    const filter = [];

    filter.push({ term: { isDeleted: false } });
    filter.push({ term: { status: 'PENDING' } });

    if (filters?.location) {
      filter.push({
        match_phrase_prefix: {
          address: {
            query: filters.location,
            slop: 3,
            boost: 2
          }
        }
      });
    }

    if (filters?.jobRoles?.length) {
      filter.push({
        terms: {
          jobRoleName: filters.jobRoles
        }
      });
    }

    if (filters?.dateRange) {
      const rangeValue = dateRangeMap[filters.dateRange];
      filter.push({
        range: {
          createdAt: { gte: rangeValue }
        }
      });
    }

    if (filters?.minSalary != null && filters?.maxSalary != null) {
      filter.push({
        range: {
          minSalary: {
            gte: filters.minSalary,
            lte: filters.maxSalary
          }
        }
      });
    }

    const mustQueries: any[] =
      q && q.trim().length > 0
        ? [
            {
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
            }
          ]
        : [{ match_all: {} }];

    const shouldQueries =
      q && q.trim().length > 0
        ? [
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
        : [];
    return {
      index: 'jobs',
      from: (page - 1) * limit,
      size: limit,
      query: {
        bool: {
          must: mustQueries,
          should: shouldQueries,
          filter
        }
      },
      sort: [{ createdAt: 'desc' as const }]
    };
  }

  searchJobFilterByAdmin(page: number, limit: number, q?: string, status?: string) {
    const mustQueries: any[] =
      q && q.trim().length > 0
        ? [
            {
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
            }
          ]
        : [{ match_all: {} }];

    return {
      index: 'jobs',
      from: (page - 1) * limit,
      size: limit,
      query: {
        bool: {
          must: mustQueries,
          should: q
            ? [
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
            : [],
          filter: status ? [{ term: { status } }] : []
        }
      },
      sort: [{ createdAt: 'desc' as const }]
    };
  }
}

export const jobQuery: JobQuery = new JobQuery();
