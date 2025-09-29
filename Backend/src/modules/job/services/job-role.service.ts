import { JobRole } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';

export interface IJobRoleService {
  create(name: string): Promise<JobRole>;
  getAll({ page, limit, filter }: any): Promise<IPaginatedResult<JobRole>>;
  findOne(name: string): Promise<JobRole>;
  delete(name: string): Promise<void>;
}
