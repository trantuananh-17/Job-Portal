import { JobBenefit } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface IJobBenefitRepository extends IBaseRepository<JobBenefit> {}
