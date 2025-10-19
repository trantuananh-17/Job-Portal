import { Job, JobStatus } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { IJobFilters } from '~/search/job/interface/job.interface';
import { JobDocument } from '~/search/job/mapper/job.mapper';
import {
  IJob,
  IJobByAdmin,
  IJobByRecruiterResponse,
  IJobIdByRecruiterResponse,
  IJobResponse,
  IJobsByAdmin
} from '../interfaces/job.interface';

export interface IJobService {
  create(requestBody: IJob, skills: string[], userId: number): Promise<Job>;

  getAll({ page, limit, filter, minSalary }: any): Promise<IPaginatedResult<Job>>;
  getAllForRecruiter({ page, limit, filter, minSalary }: any, userId: number): Promise<IPaginatedResult<Job>>;
  getOne(id: number): Promise<Job>;
  getAllJob(
    page: number,
    limit: number
  ): Promise<{
    data: IJobResponse[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  }>;
  getAllJobByRecruiter(
    page: number,
    limit: number,
    userId: number,
    status?: JobStatus
  ): Promise<{ data: IJobByRecruiterResponse[]; totalDocs: number; totalPages: number; page: number; limit: number }>;
  getJobByRecruiter(jobId: number): Promise<IJobIdByRecruiterResponse | null>;
  getJobByAdmin(jobId: number): Promise<IJobByAdmin | null>;
  getAllByAdmin(
    page: number,
    limit: number,
    search: string,
    status?: string
  ): Promise<{ data: IJobsByAdmin[]; totalDocs: number; totalPages: number; page: number; limit: number }>;

  update(id: number, companyId: number, skills: string[], requestBody: Partial<IJob>, userId: number): Promise<Job>;
  updateStatus(id: number, status: JobStatus): Promise<Job>;

  delete(id: number, companyId: number, userId: number): Promise<void>;
  deleteJobByAdmin(jobId: number): Promise<void>;

  findOne(id: number, companyId: number, userId: number): Promise<Job>;
  findOneActive(jobId: number): Promise<Job>;
  findJobByUser(id: number, userId: number): Promise<Job>;
  findIndex(id: number): Promise<JobDocument>;

  searchCompletion(page: number, limit: number, q: string): Promise<string[]>;
  searchJobsFilter(
    page: number,
    limit: number,
    search: string,
    filter: IJobFilters
  ): Promise<{
    data: IJobResponse[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  }>;
}
