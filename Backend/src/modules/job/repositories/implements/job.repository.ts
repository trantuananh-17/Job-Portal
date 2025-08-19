import { Job, JobStatus } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IJobRepository } from '../job.repository';
import prisma from '~/prisma';
import { IJob } from '../../interfaces/job.interface';

class JobRepository extends BaseRepository<Job> implements IJobRepository {
  constructor() {
    super(prisma.job);
  }
  async findByUser(id: number, userId: number): Promise<Job | null> {
    return await prisma.job.findFirst({
      where: { id, postById: userId }
    });
  }

  async findOneActive(id: number): Promise<Job | null> {
    return await prisma.job.findFirst({
      where: {
        id,
        status: 'ACTIVE'
      }
    });
  }

  async findUnique(id: number): Promise<Job | null> {
    return await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        postBy: true
      }
    });
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

  async updateJob(id: number, companyId: number, userId: number, data: Partial<IJob>): Promise<Job> {
    const { title, description, minSalary, maxSalary } = data;
    return await prisma.job.update({
      where: { id, companyId, postById: userId },
      data: { title, description, minSalary, maxSalary }
    });
  }

  async updateStatus(id: number, companyId: number, userId: number, status: JobStatus): Promise<Job> {
    return await prisma.job.update({
      where: { id, companyId, postById: userId },
      data: { status }
    });
  }

  async deleteJob(id: number, companyId: number, userId: number): Promise<boolean> {
    const deleted = await prisma.job.update({
      where: { id, companyId, postById: userId },
      data: { isDeleted: true }
    });

    return !!deleted;
  }

  async findFirst(id: number, companyId: number, userId: number): Promise<Job | null> {
    return await prisma.job.findFirst({
      where: { id, companyId, postById: userId }
    });
  }
}

export const jobRepository: IJobRepository = new JobRepository();
