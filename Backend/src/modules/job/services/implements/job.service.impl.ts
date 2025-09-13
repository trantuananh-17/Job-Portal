import { Job, JobStatus } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { IJob } from '../../interfaces/job.interface';
import { IJobService } from '../job.service';
import { companyService } from '~/modules/company/services/implements/company.service.impl';
import { jobRoleService } from './job-role.service.impl';
import { userService } from '~/modules/user/services/user.service';
import { jobRepository } from '../../repositories/implements/job.repository';
import { packageService } from '~/modules/package/services/implements/package.service.impl';
import { BadRequestException, NotFoundException } from '~/global/core/error.core';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { excludeFields } from '~/global/helpers/excludeFields.helper';
import { serializeData } from '~/global/helpers/serialize.helper';
import prisma from '~/prisma';
import { JobSyncService } from '~/search/job/sync/job.sync';
import { JobDocument, mapJobToDocument } from '~/search/job/mapper/job.mapper';

class JobService implements IJobService {
  private readonly jobSyncService = new JobSyncService();

  async create(requestBody: IJob, userId: number): Promise<Job> {
    const { companyId, jobRoleName } = requestBody;

    await companyService.findOne(companyId, userId);
    await jobRoleService.findOne(jobRoleName);

    const user = await userService.findUserUnique(userId);

    // const activePackage = await userService.checkActivePackage(user);

    // const jobsCount = await jobRepository.jobsCount(userId, activePackage);

    // const packageEntity = await packageService.readOne(activePackage.packageId, { isActive: true });

    // if (jobsCount >= packageEntity.jobPostLimit) {
    //   throw new BadRequestException('You already reach the limit of current package');
    // }

    const job = await jobRepository.createJob(requestBody, userId);

    const jobIndex = await this.findIndex(job.id);

    if (jobIndex) {
      await this.jobSyncService.createIndex();
      await this.jobSyncService.indexJob(jobIndex);
    }

    return job;
  }

  async getAll({ page, limit, filter, minSalary }: any): Promise<IPaginatedResult<Job>> {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition: { minSalary: { gte: minSalary }, isDeleted: false },
      orderCondition: { createdAt: 'desc' }
    });

    return { data, totalCounts };
  }

  async getAllForRecruiter({ page, limit, filter, minSalary }: any, userId: number): Promise<IPaginatedResult<Job>> {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition: { minSalary: { gte: minSalary }, postById: userId },
      orderCondition: { createdAt: 'desc' }
    });

    return { data, totalCounts };
  }

  async getOne(id: number): Promise<Job> {
    const job = await jobRepository.findUnique(id);
    if (!job) throw new NotFoundException(`Cannot find job: ${id}`);

    const dataConfig = {
      company: [
        { newKey: 'companyName', property: 'name' },
        { newKey: 'companyWebsiteUrl', property: 'websiteUrl' }
      ],
      postBy: [{ newKey: 'postByName', property: 'name' }]
    };

    const data = serializeData(job, dataConfig);

    return excludeFields(data, ['companyId', 'postById']);
  }

  async update(id: number, companyId: number, requestBody: Partial<IJob>, userId: number): Promise<Job> {
    await this.findOne(id, companyId, userId);

    const job = await jobRepository.updateJob(id, companyId, userId, requestBody);

    const jobIndex = await this.findIndex(job.id);

    if (jobIndex) {
      this.jobSyncService.updateJob(jobIndex);
    }

    return job;
  }

  async updateStatus(id: number, companyId: number, status: JobStatus, userId: number): Promise<Job> {
    await this.findOne(id, companyId, userId);

    const job = await jobRepository.updateStatus(id, companyId, userId, status);

    const jobIndex = await this.findIndex(job.id);

    if (jobIndex) {
      this.jobSyncService.updateJob(jobIndex);
    }

    return job;
  }

  async delete(id: number, companyId: number, userId: number): Promise<void> {
    await this.findOne(id, companyId, userId);

    await jobRepository.deleteJob(id, companyId, userId);

    this.jobSyncService.deleteJob(id);
  }

  async findOne(id: number, companyId: number, userId: number): Promise<Job> {
    const job = await jobRepository.findFirst(id, companyId, userId);

    if (!job) throw new NotFoundException(`Cannot find company: ${companyId} belong to user: ${userId}`);

    return job;
  }

  async findOneActive(jobId: number): Promise<Job> {
    const job = await jobRepository.findOneActive(jobId);

    if (!job) throw new NotFoundException('This job is no longer active');

    return job;
  }

  async findJobByUser(id: number, userId: number): Promise<Job> {
    const job = await jobRepository.findByUser(id, userId);

    if (!job) throw new NotFoundException(`Cannot find job`);

    return job;
  }

  async findIndex(id: number): Promise<JobDocument> {
    const job = await jobRepository.findIndex(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return mapJobToDocument(job);
  }
}

export const jobService: IJobService = new JobService();
