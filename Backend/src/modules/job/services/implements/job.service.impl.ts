import { Job, JobStatus } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { IJob } from '../../interfaces/job.interface';
import { IJobService } from '../job.service';
import { companyService } from '~/modules/company/services/implements/company.service.impl';
import { jobRoleService } from './job-role.service.impl';
import { userService } from '~/modules/user/services/user.service';
import prisma from '~/prisma';
import { jobRepository } from '../../repositories/implements/job.repository';
import { packageService } from '~/modules/package/services/implements/package.service.impl';
import { BadRequestException } from '~/global/core/error.core';

class JobService implements IJobService {
  async create(requestBody: IJob, userId: number): Promise<Job> {
    const { companyId, jobRoleName } = requestBody;

    await companyService.findOne(companyId, userId);
    await jobRoleService.findOne(jobRoleName);

    console.log(userId);

    const user = await userService.findUserUnique(userId);

    console.log(user);

    const activePackage = await userService.checkActivePackage(user);

    console.log(activePackage);

    const jobsCount = await jobRepository.jobsCount(userId, activePackage);

    const packageEntity = await packageService.readOne(activePackage.packageId, { isActive: true });

    if (jobsCount >= packageEntity.jobPostLimit) {
      throw new BadRequestException('You already reach the limit of current package');
    }

    const job = await jobRepository.createJob(requestBody, userId);

    return job;
  }

  async getAll({ page, limit, filter, minSalary }: any): Promise<IPaginatedResult<Job>> {
    throw new Error('Method not implemented.');
  }

  async getAllForRecruiter({ page, limit, filter, minSalary }: any, userId: number): Promise<IPaginatedResult<Job>> {
    throw new Error('Method not implemented.');
  }

  async getOne(id: number): Promise<Job> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, companyId: number, requestBody: IJob, userId: number): Promise<Job> {
    throw new Error('Method not implemented.');
  }

  async updateStatus(id: number, companyId: number, status: JobStatus, userId: number): Promise<Job> {
    throw new Error('Method not implemented.');
  }

  async delete(id: number, companyId: number, userId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: number, companyId: number, userId: number): Promise<Job> {
    throw new Error('Method not implemented.');
  }

  async findOneActive(jobId: number): Promise<Job> {
    throw new Error('Method not implemented.');
  }

  async findJobByUser(id: number, userId: number): Promise<Job> {
    throw new Error('Method not implemented.');
  }
}

export const jobService: IJobService = new JobService();
