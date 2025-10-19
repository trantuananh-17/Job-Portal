import { Job, JobStatus } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { esClient } from '~/global/configs/elastic.config';
import { NotFoundException } from '~/global/core/error.core';
import { excludeFields } from '~/global/helpers/excludeFields.helper';
import logger from '~/global/helpers/logger.helper';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { serializeData } from '~/global/helpers/serialize.helper';
import { ICompanyService } from '~/modules/company/services/company.service';
import { companyService } from '~/modules/company/services/implements/company.service.impl';
import { packageService } from '~/modules/package/services/implements/package.service.impl';
import { IPackageService } from '~/modules/package/services/package.service';
import { userService } from '~/modules/user/services/user.service';
import { IJobFilters } from '~/search/job/interface/job.interface';
import { JobDocument, mapJobToDocument } from '~/search/job/mapper/job.mapper';
import { jobQuery } from '~/search/job/queries/job.query';
import { JobSyncService } from '~/search/job/sync/job.sync';
import {
  IJob,
  IJobByAdmin,
  IJobByRecruiterResponse,
  IJobIdByRecruiterResponse,
  IJobResponse,
  IJobsByAdmin
} from '../../interfaces/job.interface';
import { jobMaper } from '../../mappers/job.mapper';
import { jobRepository } from '../../repositories/implements/job.repository';
import { IJobRepository } from '../../repositories/job.repository';
import { IJobRoleService } from '../job-role.service';
import { IJobSkillService } from '../job-skill.service';
import { IJobService } from '../job.service';
import { jobRoleService } from './job-role.service.impl';
import { jobSkillService } from './job-skill.service.impl';

class JobService implements IJobService {
  private readonly jobSyncService = new JobSyncService();

  constructor(
    private readonly companyService: ICompanyService,
    private readonly jobRoleService: IJobRoleService,
    private readonly jobRepository: IJobRepository,
    private readonly jobSkillService: IJobSkillService,
    private readonly packageService: IPackageService
  ) {}

  async getJobByAdmin(jobId: number): Promise<IJobByAdmin | null> {
    const job = await this.jobRepository.getJobByAdmin(jobId);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async getAllByAdmin(
    page: number,
    limit: number,
    search: string,
    status?: string
  ): Promise<{ data: IJobsByAdmin[]; totalDocs: number; totalPages: number; page: number; limit: number }> {
    // const [jobs, totalDocs] = await Promise.all([
    //   this.jobRepository.getAllByAdmin(page, limit, search, status),
    //   this.jobRepository.getTotalJobByAdmin(search, status)
    // ]);

    // const totalPages = Math.ceil(totalDocs / limit);
    // const data: IJobsByAdmin[] = jobs;

    const query = jobQuery.searchJobFilterByAdmin(page, limit, search, status);

    const response = await esClient.search(query);

    const data: IJobsByAdmin[] = response.hits.hits.map((hit: any) => {
      const job = hit._source!;

      return {
        id: hit._id,
        title: job.title,
        description: job.description,
        status: job.status,
        jobRole: job.jobRoleName,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary ?? null,
        totalViews: job.totalViews ?? 0,
        createdAt: new Date(job.createdAt),
        updatedAt: new Date(job.updatedAt),
        isDeleted: job.isDeleted ?? false,
        company: {
          id: job.companyId ?? 0,
          name: job.companyName ?? ''
        }
      };
    });

    const totalDocs =
      typeof response.hits.total === 'object' ? response.hits.total.value : (response.hits.total as number);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      data,
      totalDocs,
      totalPages,
      page,
      limit
    };
  }

  async getJobByRecruiter(jobId: number): Promise<IJobIdByRecruiterResponse | null> {
    const jobData = await this.jobRepository.getJobIdByRecruiter(jobId);

    if (!jobData) {
      throw new NotFoundException('Job not found');
    }

    const job = {
      id: jobData.id,
      title: jobData.title,
      description: jobData.description,
      jobRoleName: jobData.jobRoleName,
      minSalary: jobData.minSalary,
      maxSalary: jobData.maxSalary,
      benefits: jobData.benefits,
      requirements: jobData.requirements,
      skills: jobData.jobSkills.map((js) => js.skill.name)
    };

    return job;
  }

  async getAllJobByRecruiter(
    page: number,
    limit: number,
    userId: number,
    status?: JobStatus
  ): Promise<{ data: IJobByRecruiterResponse[]; totalDocs: number; totalPages: number; page: number; limit: number }> {
    const [jobs, totalDocs] = await Promise.all([
      this.jobRepository.getAllByRecruiter(page, limit, userId, status),
      this.jobRepository.getTotalJobByReruiter(userId, status)
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const data: IJobByRecruiterResponse[] = jobs;

    return {
      data,
      totalDocs,
      totalPages,
      page,
      limit
    };
  }

  async searchJobsFilter(
    page: number,
    limit: number,
    search: string,
    filter: IJobFilters
  ): Promise<{
    data: IJobResponse[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const query = jobQuery.searchJobFilter(page, limit, search, filter);

    const response = await esClient.search(query);

    const data: IJobResponse[] = response.hits.hits.map((hit: any) => {
      const job = hit._source!;

      return {
        id: hit._id,
        title: job.title,
        description: job.description,
        status: job.status,
        jobRole: job.jobRoleName,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary ?? null,
        totalViews: job.totalViews ?? 0,
        createdAt: new Date(job.createdAt),
        isDeleted: job.isDeleted ?? false,
        company: {
          id: job.companyId ?? 0,
          name: job.companyName ?? '',
          logo: job.companyLogo ?? null,
          address: job.address ?? null
        }
      };
    });

    const totalDocs =
      typeof response.hits.total === 'object' ? response.hits.total.value : (response.hits.total as number);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      data,
      totalDocs,
      totalPages,
      page,
      limit
    };
  }

  async getAllJob(
    page: number,
    limit: number
  ): Promise<{
    data: IJobResponse[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const [jobs, totalDocs] = await Promise.all([
      this.jobRepository.getAllByCandidate(page, limit),
      this.jobRepository.getTotalJob()
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const data: IJobResponse[] = jobs.map((job) => jobMaper.toJobResponse(job));

    return {
      data,
      totalDocs,
      totalPages,
      page,
      limit
    };
  }

  async searchCompletion(page: number, limit: number, q: string): Promise<string[]> {
    const query = jobQuery.searchComplete(page, limit, q);

    const response = await esClient.search(query);

    const results = response.hits.hits.map((job: any) => job._source.title) ?? [];

    const uniqueResults = [...new Set(results.filter(Boolean))];

    return uniqueResults;
  }

  async create(requestBody: IJob, skills: string[], userId: number): Promise<Job> {
    const { companyId, jobRoleName, title, benefits, description, maxSalary, minSalary, requirements, activeDays } =
      requestBody;

    const jobRoleToLower = jobRoleName.toLowerCase();

    await this.companyService.findOne(companyId, userId);
    await this.jobRoleService.findOne(jobRoleToLower);

    const user = await userService.findUserUnique(userId);

    // const activePackage = await userService.checkActivePackage(user);

    // const jobsCount = await this.jobRepository.jobsCount(userId, activePackage);

    // const packageEntity = await this.packageService.readOne(activePackage.packageId, { isActive: true });

    // if (jobsCount >= packageEntity.jobPostLimit) {
    //   throw new BadRequestException('You already reach the limit of current package');
    // }

    const payload: IJob = {
      companyId,
      title,
      description,
      minSalary,
      maxSalary,
      jobRoleName: jobRoleToLower,
      benefits,
      activeDays,
      requirements
    };

    const job = await this.jobRepository.createJob(payload, userId);

    if (skills?.length) {
      await this.jobSkillService.createMany(job.id, skills, userId);
    }

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

  async update(
    id: number,
    companyId: number,
    skills: string[],
    requestBody: Partial<IJob>,
    userId: number
  ): Promise<Job> {
    await this.findOne(id, companyId, userId);

    const job = await this.jobRepository.updateJob(id, companyId, userId, requestBody);

    await this.jobSkillService.deleteMany(id);

    if (skills?.length) {
      await this.jobSkillService.createMany(job.id, skills, userId);
    }

    const jobIndex = await this.findIndex(job.id);

    if (jobIndex) {
      await this.jobSyncService.updateJob(jobIndex);
    }

    return job;
  }

  async updateStatus(id: number, status: JobStatus): Promise<Job> {
    const job = await this.jobRepository.updateStatus(id, status);

    let updatedJob = job;

    if (status === JobStatus.ACTIVE) {
      const activeDays = job.activeDays ?? 30;
      const newExpiration = new Date();
      newExpiration.setDate(newExpiration.getDate() + activeDays);

      updatedJob = await this.jobRepository.updateExpirationDate(job.id, newExpiration);
    }

    const jobIndex = await this.findIndex(id);
    if (jobIndex) {
      await this.jobSyncService.updateJob(jobIndex);
    }

    return updatedJob;
  }

  async delete(id: number, companyId: number, userId: number): Promise<void> {
    await this.findOne(id, companyId, userId);

    await this.jobRepository.deleteJob(id, companyId, userId);

    const jobIndex = await this.findIndex(id);

    if (jobIndex) {
      await this.jobSyncService.deleteJob(id);
    }
  }

  async deleteJobByAdmin(jobId: number): Promise<void> {
    await this.jobRepository.deleteJobByAdmin(jobId);

    const jobIndex = await this.findIndex(jobId);

    if (jobIndex) {
      await this.jobSyncService.deleteJob(jobId);
    }
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

export const jobService: IJobService = new JobService(
  companyService,
  jobRoleService,
  jobRepository,
  jobSkillService,
  packageService
);
