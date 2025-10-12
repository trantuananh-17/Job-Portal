const datePostItem = ['Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'] as const;

export type DateRangeOption = (typeof datePostItem)[number];

export const dateRangeMap: Record<DateRangeOption, string> = {
  'Last Hour': 'now-1h',
  'Last 24 Hours': 'now-24h',
  'Last 7 Days': 'now-7d',
  'Last 30 Days': 'now-30d'
};

export interface IJobFilters {
  location?: string;
  jobRoles?: string[];
  dateRange?: DateRangeOption;
  minSalary?: number;
  maxSalary?: number;
}
