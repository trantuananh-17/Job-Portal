import { Company, Job, JobSkill, JobStatus, User } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import {
  IJob,
  IJobResponse,
  IJobByRecruiterResponse,
  IJobIdByRecruiter,
  IJobsByAdmin,
  IJobByAdmin
} from '../interfaces/job.interface';

export interface IJobRepository extends IBaseRepository<Job> {
  jobsCount(userId: number, activePackage: any): Promise<number>;
  createJob(requestBody: IJob, userId: number): Promise<Job>;
  findUnique(id: number): Promise<Job | null>;

  updateJob(id: number, companyId: number, userId: number, data: Partial<IJob>): Promise<Job>;
  updateStatus(id: number, status: JobStatus): Promise<Job>;
  updateExpirationDate(id: number, expirationDate: Date): Promise<Job>;

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
  getAllByRecruiter(
    page: number,
    limit: number,
    userId: number,
    status?: JobStatus
  ): Promise<IJobByRecruiterResponse[]>;

  getTotalJob(): Promise<number>;
  getTotalJobByReruiter(userId: number, status?: JobStatus): Promise<number>;
  getTotalJobByAdmin(search?: string, status?: JobStatus): Promise<number>;
  getJobIdByRecruiter(jobId: number): Promise<IJobIdByRecruiter | null>;

  getAllByAdmin(page: number, limit: number, search?: string, status?: JobStatus): Promise<IJobsByAdmin[]>;
  getJobByAdmin(jobId: number): Promise<IJobByAdmin | null>;

  deleteJobByAdmin(jobId: number): Promise<boolean>;
  deleteJob(id: number, companyId: number, userId: number): Promise<boolean>;
}
