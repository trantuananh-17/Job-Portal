import { Company, Job, JobSkill, JobStatus, PrismaClient, User } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IJobRepository } from '../job.repository';
import prisma from '~/prisma';
import {
  IJob,
  IJobByAdmin,
  IJobByRecruiterResponse,
  IJobIdByRecruiter,
  IJobResponse,
  IJobsByAdmin
} from '../../interfaces/job.interface';

class JobRepository extends BaseRepository<Job> implements IJobRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.job);
  }

  async getJobByAdmin(jobId: number): Promise<IJobByAdmin | null> {
    return await this.prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        title: true,
        description: true,
        jobRoleName: true,
        minSalary: true,
        maxSalary: true,
        benefits: true,
        requirements: true,
        createdAt: true,
        updatedAt: true,

        jobSkills: {
          select: {
            skill: {
              select: {
                name: true
              }
            }
          }
        },

        company: {
          select: {
            id: true,
            name: true,
            avatarUrl: true
          }
        },

        postBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async getAllByAdmin(page: number, limit: number, search?: string, status?: JobStatus): Promise<IJobsByAdmin[]> {
    return await this.prisma.job.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(search
          ? {
              title: {
                contains: search.trim(),
                mode: 'insensitive'
              }
            }
          : {})
      },
      select: {
        id: true,
        title: true,
        status: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
        company: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });
  }

  async getJobIdByRecruiter(jobId: number): Promise<IJobIdByRecruiter | null> {
    return await this.prisma.job.findUnique({
      where: {
        id: jobId
      },
      select: {
        id: true,
        title: true,
        description: true,
        jobRoleName: true,
        minSalary: true,
        maxSalary: true,
        benefits: true,
        requirements: true,
        jobSkills: {
          select: {
            skill: {
              select: { name: true }
            }
          }
        }
      }
    });
  }

  async getAllByRecruiter(
    page: number,
    limit: number,
    userId: number,
    status?: JobStatus
  ): Promise<IJobByRecruiterResponse[]> {
    const jobs = await this.prisma.job.findMany({
      where: {
        postById: userId,
        ...(status ? { status } : {})
      },
      select: {
        id: true,
        title: true,
        status: true,
        isDeleted: true,
        _count: { select: { applies: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    return jobs.map((job) => ({
      id: job.id,
      title: job.title,
      status: job.status,
      isDeleted: job.isDeleted,
      totalApply: job._count.applies
    }));
  }

  async getTotalJob(): Promise<number> {
    return await this.prisma.job.count({
      where: {
        isDeleted: false,
        status: 'ACTIVE'
      }
    });
  }

  async getTotalJobByReruiter(userId: number, status?: JobStatus): Promise<number> {
    return await this.prisma.job.count({
      where: {
        postById: userId,
        ...(status ? { status } : {})
      }
    });
  }

  async getTotalJobByAdmin(search?: string, status?: JobStatus): Promise<number> {
    return await this.prisma.job.count({
      where: {
        ...(status ? { status } : {}),
        ...(search
          ? {
              title: {
                contains: search.trim(),
                mode: 'insensitive'
              }
            }
          : {})
      }
    });
  }

  async getAllByCandidate(page: number, limit: number): Promise<(Job & { company: Company })[]> {
    return await this.prisma.job.findMany({
      // where: {
      //   isDeleted: false,
      //   status: 'ACTIVE'
      // },
      include: {
        company: true
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });
  }

  async findIndex(id: number): Promise<(Job & { company: Company; postBy: User }) | null> {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        postBy: true
      }
    });
  }

  async findByUser(id: number, userId: number): Promise<Job | null> {
    return await this.prisma.job.findFirst({
      where: { id, postById: userId }
    });
  }

  async findOneActive(id: number): Promise<Job | null> {
    return await this.prisma.job.findFirst({
      where: {
        id,
        status: 'ACTIVE'
      }
    });
  }

  async findUnique(id: number): Promise<Job | null> {
    return await this.prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        postBy: true
      }
    });
  }

  async createJob(requestBody: IJob, userId: number): Promise<Job> {
    const { companyId, description, jobRoleName, maxSalary, minSalary, title, benefits, requirements, activeDays } =
      requestBody;
    return await this.prisma.job.create({
      data: {
        companyId,
        jobRoleName,
        title,
        description,
        minSalary,
        maxSalary,
        benefits,
        requirements,
        activeDays,
        postById: userId
      }
    });
  }

  async jobsCount(userId: number, activePackage: any): Promise<number> {
    return await this.prisma.job.count({
      where: {
        postById: userId,
        createdAt: { gt: new Date(activePackage.startDate) },
        isDeleted: false
      }
    });
  }

  async updateJob(id: number, companyId: number, userId: number, data: Partial<IJob>): Promise<Job> {
    const { title, description, minSalary, maxSalary, jobRoleName, benefits, requirements } = data;
    return await this.prisma.job.update({
      where: { id, companyId, postById: userId },
      data: { title, description, minSalary, maxSalary, jobRoleName, benefits, requirements }
    });
  }

  async updateStatus(id: number, status: JobStatus): Promise<Job> {
    return await this.prisma.job.update({
      where: { id },
      data: { status }
    });
  }

  async updateExpirationDate(id: number, expirationDate: Date): Promise<Job> {
    return this.prisma.job.update({
      where: { id },
      data: { expirationDate }
    });
  }

  async deleteJob(id: number, companyId: number, userId: number): Promise<boolean> {
    const deleted = await this.prisma.job.update({
      where: { id, companyId, postById: userId },
      data: { isDeleted: true }
    });

    return !!deleted;
  }

  async deleteJobByAdmin(jobId: number): Promise<boolean> {
    const deleted = await this.prisma.job.update({
      where: { id: jobId },
      data: { isDeleted: true }
    });

    return !!deleted;
  }

  async findFirst(id: number, companyId: number, userId: number): Promise<Job | null> {
    return await this.prisma.job.findFirst({
      where: { id, companyId, postById: userId }
    });
  }
}

export const jobRepository: IJobRepository = new JobRepository(prisma);
