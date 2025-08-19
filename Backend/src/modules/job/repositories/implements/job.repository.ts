import { Job } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IJobRepository } from '../job.repository';
import prisma from '~/prisma';
import { IJob } from '../../interfaces/job.interface';

class JobRepository extends BaseRepository<Job> implements IJobRepository {
  constructor() {
    super(prisma.job);
  }
  async createJob(requestBody: IJob, userId: number): Promise<Job> {
    const { companyId, description, jobRoleName, maxSalary, minSalary, title } = requestBody;
    return await prisma.job.create({
      data: {
        companyId,
        jobRoleName,
        title,
        description,
        minSalary,
        maxSalary,
        postById: userId
      }
    });
  }

  async jobsCount(userId: number, activePackage: any): Promise<number> {
    return await prisma.job.count({
      where: {
        postById: userId,
        createdAt: { gt: new Date(activePackage.startDate) },
        isDeleted: false
      }
    });
  }
}

export const jobRepository: IJobRepository = new JobRepository();
