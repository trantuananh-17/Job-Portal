export interface IJob {
  companyId: number;
  title: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  jobRoleName: string;
}

export interface IJobFilters {
  company?: string;
  jobRoles?: string[];
  dateRange?: string[];
  minSalary?: number;
  maxSalary?: number;
}
