import { Job } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface IJobRepository extends IBaseRepository<Job> {}
