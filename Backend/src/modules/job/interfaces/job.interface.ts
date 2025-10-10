import { JobStatus } from '@prisma/client';

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
export interface IJobResponse {
  id: number;
  title: string;
  description: string;
  status: JobStatus;
  jobRole: string;
  minSalary: number;
  maxSalary: number | null;
  totalViews: number;
  createdAt: Date;
  isDeleted: boolean;
  company: {
    id: number;
    name: string;
    logo: string | null;
    address: string | null;
  };
}
