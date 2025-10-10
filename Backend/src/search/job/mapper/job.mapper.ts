import { Company, Job, JobStatus, User } from '@prisma/client';

export interface JobDocument {
  id: number;
  title: string;
  title_suggest?: {
    input: string[];
  };
  description: string;
  status: JobStatus;
  jobRoleName: string;
  minSalary: number;
  maxSalary?: number;
  companyName: string;
  logo: string;
  address: string;
  recruiter: string;
  createdAt: string;
  isDeleted: boolean;
}

export function mapJobToDocument(
  job: Job & {
    company: Company;
    postBy: User;
  }
): JobDocument {
  return {
    id: job.id,
    title: job.title,
    title_suggest: {
      input: [job.title]
    },
    description: job.description,
    jobRoleName: job.jobRoleName,
    status: job.status,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary ?? undefined,
    companyName: job.company?.name,
    logo: job.company?.avatarUrl ?? '',
    address: job.company.address ?? '',
    recruiter: job.postBy?.name ?? '',
    createdAt: job.createdAt.toISOString(),
    isDeleted: job.isDeleted
  };
}
