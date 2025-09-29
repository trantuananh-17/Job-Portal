import { Benefit, JobBenefit, PrismaClient } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { IJobBenefitRepository } from '../job-benefit.repository';

class JobBenefitRepository extends BaseRepository<JobBenefit> implements IJobBenefitRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.jobBenefit);
  }

  async findBenefit(name: string): Promise<Benefit | null> {
    return await this.prisma.benefit.findUnique({
      where: {
        name
      }
    });
  }

  async getBenefitByJob(jobId: number): Promise<JobBenefit[]> {
    return await this.prisma.jobBenefit.findMany({
      where: {
        jobId
      }
    });
  }

  async deleteBenefit(jobId: number, benefitName: string): Promise<boolean> {
    const deleted = await this.prisma.jobBenefit.delete({
      where: {
        jobId_benefitName: {
          jobId,
          benefitName
        }
      }
    });

    return !!deleted;
  }

  async findOne(jobId: number, benefitName: string): Promise<JobBenefit | null> {
    return await this.prisma.jobBenefit.findUnique({
      where: {
        jobId_benefitName: {
          jobId,
          benefitName
        }
      }
    });
  }
}

export const jobBenefitRepository: IJobBenefitRepository = new JobBenefitRepository(prisma);
