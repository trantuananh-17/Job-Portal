import { Job } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IJobRepository } from '../job.repository';
import prisma from '~/prisma';

class JobRepository extends BaseRepository<Job> implements IJobRepository {
  constructor() {
    super(prisma.job);
  }
}

export const jobRepository: IJobRepository = new JobRepository();
