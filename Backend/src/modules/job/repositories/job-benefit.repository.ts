import { Benefit, JobBenefit } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface IJobBenefitRepository extends IBaseRepository<JobBenefit> {
  findBenefit(name: string): Promise<Benefit | null>;
  getBenefitByJob(jobId: number): Promise<JobBenefit[]>;
  deleteBenefit(jobId: number, benefitName: string): Promise<boolean>;
  findOne(jobId: number, benefitName: string): Promise<JobBenefit | null>;
}
