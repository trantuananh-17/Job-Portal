import { Job } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { IJob } from '../interfaces/job.interface';

export interface IJobRepository extends IBaseRepository<Job> {
  jobsCount(userId: number, activePackage: any): Promise<number>;
  createJob(requestBody: IJob, userId: number): Promise<Job>;
}
