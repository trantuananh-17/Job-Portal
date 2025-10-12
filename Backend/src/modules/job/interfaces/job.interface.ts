import { JobStatus } from '@prisma/client';

export interface IJob {
  companyId: number;
  title: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  jobRoleName: string;
  benefits: string;
  requirements: string;
}

export interface IJobFilters {
  location?: string;
  jobRoles?: string[];
  dateRange?: ('Last Hour' | 'Last 24 Hours' | 'Last 7 Days' | 'Last 30 Days')[];
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
