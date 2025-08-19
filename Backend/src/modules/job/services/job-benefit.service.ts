import { Benefit, JobBenefit } from '@prisma/client';

export interface IJobBenefitService {
  create(jobId: number, benefitName: string, userId: number): Promise<JobBenefit>;
  findBenefit(name: string): Promise<Benefit>;
  getAllByJobId(jobId: number): Promise<JobBenefit[]>;
  delete(jobId: number, benefitName: string, userId: number): Promise<void>;
  findOne(jobId: number, benefitName: string): Promise<JobBenefit>;
}
