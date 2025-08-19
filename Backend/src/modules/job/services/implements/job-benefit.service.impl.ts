import { JobBenefit, Benefit } from '@prisma/client';
import { IJobBenefitService } from '../job-benefit.service';
import { jobBenefitRepository } from '../../repositories/implements/job-benefit.repository.impl';
import { jobService } from './job.service.impl';
import { NotFoundException } from '~/global/core/error.core';

class JobBenefitService implements IJobBenefitService {
  async create(jobId: number, benefitName: string, userId: number): Promise<JobBenefit> {
    await jobService.findJobByUser(jobId, userId);
    await this.findBenefit(benefitName);

    const data = {
      jobId,
      benefitName
    };

    const jobBenefit = await jobBenefitRepository.create(data);

    return jobBenefit;
  }

  async findBenefit(name: string): Promise<Benefit> {
    const benefit = await jobBenefitRepository.findBenefit(name);

    if (!benefit) throw new NotFoundException(`Benefit: ${name} does not exist`);

    return benefit;
  }

  async getAllByJobId(jobId: number): Promise<JobBenefit[]> {
    const jobBenefits = await jobBenefitRepository.getBenefitByJob(jobId);

    return jobBenefits;
  }

  async delete(jobId: number, benefitName: string, userId: number): Promise<void> {
    await jobService.findJobByUser(jobId, userId);
    await this.findBenefit(benefitName);
    await this.findOne(jobId, benefitName);

    await jobBenefitRepository.deleteBenefit(jobId, benefitName);
  }

  async findOne(jobId: number, benefitName: string): Promise<JobBenefit> {
    const jobBenefit = await jobBenefitRepository.findOne(jobId, benefitName);

    if (!jobBenefit) throw new NotFoundException(`Cannot find benefit: ${jobBenefit} in this job`);

    return jobBenefit;
  }
}

export const jobBenefitService: IJobBenefitService = new JobBenefitService();
