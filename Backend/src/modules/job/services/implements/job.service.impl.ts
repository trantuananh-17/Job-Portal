import { Job, JobStatus } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { BadRequestException, NotFoundException } from '~/global/core/error.core';
import { excludeFields } from '~/global/helpers/excludeFields.helper';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { serializeData } from '~/global/helpers/serialize.helper';
import { companyService } from '~/modules/company/services/implements/company.service.impl';
import { userService } from '~/modules/user/services/user.service';
import { JobDocument, mapJobToDocument } from '~/search/job/mapper/job.mapper';
import { JobSyncService } from '~/search/job/sync/job.sync';
import { IJob } from '../../interfaces/job.interface';
import { jobRepository } from '../../repositories/implements/job.repository';
import { IJobService } from '../job.service';
import { jobRoleService } from './job-role.service.impl';
import { ICompanyService } from '~/modules/company/services/company.service';
import { IJobRoleService } from '../job-role.service';
import { IJobRepository } from '../../repositories/job.repository';
import { IPackageService } from '~/modules/package/services/package.service';
import { packageService } from '~/modules/package/services/implements/package.service.impl';
import { jobQuery } from '~/search/job/queries/job.query';
import { esClient } from '~/global/configs/elastic.config';
import logger from '~/global/helpers/logger.helper';

class JobService implements IJobService {
  private readonly jobSyncService = new JobSyncService();

  constructor(
    private readonly companyService: ICompanyService,
    private readonly jobRoleService: IJobRoleService,
    private readonly jobRepository: IJobRepository,
    private readonly packageService: IPackageService
  ) {}

  async searchCompletion(page: number, limit: number, q: string): Promise<string[]> {
    const query = jobQuery.searchComplete(page, limit, q);

    const response = await esClient.search(query);

    logger.info(response);

    const results = response.hits.hits.map((job: any) => job._source.title) ?? [];
    logger.info(results);

    const uniqueResults = [...new Set(results.filter(Boolean))];

    return uniqueResults;
  }

  async create(requestBody: IJob, userId: number): Promise<Job> {
    const { companyId, jobRoleName } = requestBody;

    await this.companyService.findOne(companyId, userId);
    await this.jobRoleService.findOne(jobRoleName);

    const user = await userService.findUserUnique(userId);

    // const activePackage = await userService.checkActivePackage(user);

    // const jobsCount = await this.jobRepository.jobsCount(userId, activePackage);

    // const packageEntity = await this.packageService.readOne(activePackage.packageId, { isActive: true });

    // if (jobsCount >= packageEntity.jobPostLimit) {
    //   throw new BadRequestException('You already reach the limit of current package');
    // }

    const job = await this.jobRepository.createJob(requestBody, userId);

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
    const job = await this.jobRepository.findUnique(id);
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

    const job = await this.jobRepository.updateJob(id, companyId, userId, requestBody);

    const jobIndex = await this.findIndex(job.id);

    if (jobIndex) {
      await this.jobSyncService.updateJob(jobIndex);
    }

    return job;
  }

  async updateStatus(id: number, companyId: number, status: JobStatus, userId: number): Promise<Job> {
    await this.findOne(id, companyId, userId);

    const job = await this.jobRepository.updateStatus(id, companyId, userId, status);

    const jobIndex = await this.findIndex(job.id);

    if (jobIndex) {
      await this.jobSyncService.updateJob(jobIndex);
    }

    return job;
  }

  async delete(id: number, companyId: number, userId: number): Promise<void> {
    await this.findOne(id, companyId, userId);

    await this.jobRepository.deleteJob(id, companyId, userId);

    await this.jobSyncService.deleteJob(id);
  }

  async findOne(id: number, companyId: number, userId: number): Promise<Job> {
    const job = await this.jobRepository.findFirst(id, companyId, userId);

    if (!job) throw new NotFoundException(`Cannot find company: ${companyId} belong to user: ${userId}`);

    return job;
  }

  async findOneActive(jobId: number): Promise<Job> {
    const job = await this.jobRepository.findOneActive(jobId);

    if (!job) throw new NotFoundException('This job is no longer active');

    return job;
  }

  async findJobByUser(id: number, userId: number): Promise<Job> {
    const job = await this.jobRepository.findByUser(id, userId);

    if (!job) throw new NotFoundException(`Cannot find job`);

    return job;
  }

  async findIndex(id: number): Promise<JobDocument> {
    const job = await this.jobRepository.findIndex(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return mapJobToDocument(job);
  }
}

export const jobService: IJobService = new JobService(companyService, jobRoleService, jobRepository, packageService);
