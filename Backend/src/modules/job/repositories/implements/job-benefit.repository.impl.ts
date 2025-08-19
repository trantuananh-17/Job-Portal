import { Benefit, JobBenefit } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { IJobBenefitRepository } from '../job-benefit.repository';

class JobBenefitRepository extends BaseRepository<JobBenefit> implements IJobBenefitRepository {
  constructor() {
    super(prisma.jobBenefit);
  }

  async findBenefit(name: string): Promise<Benefit | null> {
    return await prisma.benefit.findUnique({
      where: {
        name
      }
    });
  }

  async getBenefitByJob(jobId: number): Promise<JobBenefit[]> {
    return await prisma.jobBenefit.findMany({
      where: {
        jobId
      }
    });
  }

  async deleteBenefit(jobId: number, benefitName: string): Promise<boolean> {
    const deleted = await prisma.jobBenefit.delete({
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
    return await prisma.jobBenefit.findUnique({
      where: {
        jobId_benefitName: {
          jobId,
          benefitName
        }
      }
    });
  }
}

export const jobBenefitRepository: IJobBenefitRepository = new JobBenefitRepository();
