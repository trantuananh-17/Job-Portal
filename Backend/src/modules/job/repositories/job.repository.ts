import { Company, Job, JobSkill, JobStatus, User } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { IJob, IJobResponse } from '../interfaces/job.interface';

export interface IJobRepository extends IBaseRepository<Job> {
  jobsCount(userId: number, activePackage: any): Promise<number>;
  createJob(requestBody: IJob, userId: number): Promise<Job>;
  findUnique(id: number): Promise<Job | null>;
  updateJob(id: number, companyId: number, userId: number, data: Partial<IJob>): Promise<Job>;
  updateStatus(id: number, companyId: number, userId: number, status: JobStatus): Promise<Job>;
  deleteJob(id: number, companyId: number, userId: number): Promise<boolean>;
  findFirst(id: number, companyId: number, userId: number): Promise<Job | null>;
  findOneActive(id: number): Promise<Job | null>;
  findByUser(id: number, userId: number): Promise<Job | null>;
  findIndex(id: number): Promise<
    | (Job & {
        company: Company;
        postBy: User;
      })
    | null
  >;
  getAllByCandidate(page: number, limit: number): Promise<(Job & { company: Company })[]>;

  getTotalJob(): Promise<number>;
}
