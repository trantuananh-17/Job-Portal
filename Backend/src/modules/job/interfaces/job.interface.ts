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
  activeDays: number;
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

export interface IJobByRecruiterResponse {
  id: number;
  title: string;
  status: JobStatus;
  isDeleted: boolean;
  totalApply: number;
}

export interface IJobIdByRecruiterResponse {
  id: number;
  title: string;
  description: string;
  jobRoleName: string;
  minSalary: number;
  maxSalary: number | null;
  benefits: string;
  requirements: string;
  skills: string[];
}

export interface IJobIdByRecruiter {
  id: number;
  title: string;
  description: string;
  jobRoleName: string;
  minSalary: number;
  maxSalary: number | null;
  benefits: string;
  requirements: string;
  jobSkills: {
    skill: {
      name: string;
    };
  }[];
}
