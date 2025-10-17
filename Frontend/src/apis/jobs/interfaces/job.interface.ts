export interface IJobSearch {
  search: string;
}

export interface IJobFilter {
  search: string;
  location: string;
  roles: string[];
  datePosted: string[];
  salaryRange: number[];
}

export interface IJobByCandidateResponse {
  id: number;
  title: string;
  description: string;
  status: string;
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

export interface IJobCreate {
  title: string;
  description: string;
  jobRoleName: string;
  minSalary: number;
  maxSalary: number;
  benefits: string;
  requirements: string;
  skills: string[];
}

export interface IJobPayloadCreate {
  companyId: number;
  title: string;
  description: string;
  jobRoleName: string;
  minSalary: number;
  maxSalary: number;
  benefits: string;
  requirements: string;
  skills: string[];
}

export type JobStatus = {
  ALL: 'all';
  PENDING: 'PEDING';
  ACTIVE: 'ACTIVE';
  EXPIRED: 'EXPIRED';
  REJECTED: 'REJECTED';
};

export interface IJobByRecruiterResponse {
  id: number;
  title: string;
  status: string;
  isDeleted: boolean;
  totalApply: number;
}
