import { Job, JobSkill, JobBenefit, Company, User } from '@prisma/client';

export interface JobDocument {
  id: number;
  title: string;
  description: string;
  status: string;
  jobRoleName: string;
  minSalary: number;
  maxSalary?: number;
  companyName: string;
  recruiter: string;
  skills: string[];
  benefits: string[];
  createdAt: string;
  isDeleted: boolean;
}

export function mapJobToDocument(
  job: Job & {
    company: Company;
    postBy: User;
    jobSkills: JobSkill[];
    jobBenefits: JobBenefit[];
  }
): JobDocument {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    jobRoleName: job.jobRoleName,
    status: job.status,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary ?? undefined,
    companyName: job.company?.name,
    recruiter: job.postBy?.name ?? '',
    skills: job.jobSkills.map((s) => s.skillName),
    benefits: job.jobBenefits.map((b) => b.benefitName),
    createdAt: job.createdAt.toISOString(),
    isDeleted: job.isDeleted
  };
}
