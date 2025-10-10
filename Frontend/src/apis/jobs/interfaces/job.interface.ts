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
