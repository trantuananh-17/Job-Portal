import { JobRole } from '@prisma/client';

export interface IJobRoleRepository {
  findOne(name: string): Promise<JobRole | null>;
  create(name: string): Promise<JobRole>;
  delete(name: string): Promise<boolean>;
}
