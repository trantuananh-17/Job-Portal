import { Benefit, JobBenefit } from '@prisma/client';
import { NotFoundException } from '~/global/core/error.core';
import { jobBenefitRepository } from '../../repositories/implements/job-benefit.repository.impl';
import { IJobBenefitRepository } from '../../repositories/job-benefit.repository';
import { IJobBenefitService } from '../job-benefit.service';
import { IJobService } from '../job.service';
import { jobService } from './job.service.impl';

class JobBenefitService implements IJobBenefitService {
  constructor(
    private readonly jobBenefitRepository: IJobBenefitRepository,
    private readonly jobService: IJobService
  ) {}

  async create(jobId: number, benefitName: string, userId: number): Promise<JobBenefit> {
    await this.jobService.findJobByUser(jobId, userId);
    await this.findBenefit(benefitName);

    const data = {
      jobId,
      benefitName
    };

    const jobBenefit = await this.jobBenefitRepository.create(data);

    return jobBenefit;
  }

  async findBenefit(name: string): Promise<Benefit> {
    const benefit = await this.jobBenefitRepository.findBenefit(name);

    if (!benefit) throw new NotFoundException(`Benefit: ${name} does not exist`);

    return benefit;
  }

  async getAllByJobId(jobId: number): Promise<JobBenefit[]> {
    const jobBenefits = await this.jobBenefitRepository.getBenefitByJob(jobId);

    return jobBenefits;
  }

  async delete(jobId: number, benefitName: string, userId: number): Promise<void> {
    await this.jobService.findJobByUser(jobId, userId);
    await this.findBenefit(benefitName);
    await this.findOne(jobId, benefitName);

    await this.jobBenefitRepository.deleteBenefit(jobId, benefitName);
  }

  async findOne(jobId: number, benefitName: string): Promise<JobBenefit> {
    const jobBenefit = await this.jobBenefitRepository.findOne(jobId, benefitName);

    if (!jobBenefit) throw new NotFoundException(`Cannot find benefit: ${jobBenefit} in this job`);

    return jobBenefit;
  }
}

export const jobBenefitService: IJobBenefitService = new JobBenefitService(jobBenefitRepository, jobService);
