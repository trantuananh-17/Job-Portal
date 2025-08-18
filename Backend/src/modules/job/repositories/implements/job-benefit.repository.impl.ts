import { JobBenefit } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { IJobBenefitRepository } from '../job-benefit.repository';

class JobBenefitRepository extends BaseRepository<JobBenefit> implements IJobBenefitRepository {
  constructor() {
    super(prisma.jobBenefit);
  }
}

export const jobBenefitRepository: IJobBenefitRepository = new JobBenefitRepository();
