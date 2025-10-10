import { Company, Job } from '@prisma/client';
import { IJobResponse } from '../interfaces/job.interface';

class JobMapper {
  public toJobResponse(job: Job & { company: Company }): IJobResponse {
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      status: job.status,
      jobRole: job.jobRoleName,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      totalViews: job.totalViews,
      createdAt: job.createdAt,
      isDeleted: job.isDeleted,
      company: {
        id: job.company.id,
        name: job.company.name,
        logo: job.company.avatarUrl,
        address: job.company.address
      }
    };
  }
}
export const jobMaper: JobMapper = new JobMapper();
