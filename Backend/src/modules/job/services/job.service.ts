import { Job, JobStatus } from '@prisma/client';
import { IJob } from '../interfaces/job.interface';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { JobDocument } from '~/search/job/mapper/job.mapper';

export interface IJobService {
  create(requestBody: IJob, userId: number): Promise<Job>;

  getAll({ page, limit, filter, minSalary }: any): Promise<IPaginatedResult<Job>>;
  getAllForRecruiter({ page, limit, filter, minSalary }: any, userId: number): Promise<IPaginatedResult<Job>>;
  getOne(id: number): Promise<Job>;

  update(id: number, companyId: number, requestBody: Partial<IJob>, userId: number): Promise<Job>;
  updateStatus(id: number, companyId: number, status: JobStatus, userId: number): Promise<Job>;

  delete(id: number, companyId: number, userId: number): Promise<void>;

  findOne(id: number, companyId: number, userId: number): Promise<Job>;
  findOneActive(jobId: number): Promise<Job>;
  findJobByUser(id: number, userId: number): Promise<Job>;

  findIndex(id: number): Promise<JobDocument>;

  searchCompletion(page: number, limit: number, q: string): Promise<string[]>;
}
