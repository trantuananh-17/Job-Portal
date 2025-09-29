import { JobRole } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { IJobRoleService } from '../job-role.service';
import { jobRoleRepository } from '../../repositories/implements/job-role.repository.impl';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { NotFoundException } from '~/global/core/error.core';
import { IJobRoleRepository } from '../../repositories/job-role.repository';

class JobRoleService implements IJobRoleService {
  constructor(private readonly jobRoleRepository: IJobRoleRepository) {}

  async create(name: string): Promise<JobRole> {
    const jobRole = await this.jobRoleRepository.create(name);

    return jobRole;
  }

  async getAll({ page, limit, filter }: any): Promise<IPaginatedResult<JobRole>> {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name'],
      entity: 'jobRole'
    });

    return { data, totalCounts };
  }

  async findOne(name: string): Promise<JobRole> {
    const jobRole = await this.jobRoleRepository.findOne(name);

    if (!jobRole) {
      throw new NotFoundException(`Job Role: ${name} does not exist`);
    }

    return jobRole;
  }

  async delete(name: string): Promise<void> {
    await this.findOne(name);

    await this.jobRoleRepository.delete(name);
  }
}

export const jobRoleService: IJobRoleService = new JobRoleService(jobRoleRepository);
