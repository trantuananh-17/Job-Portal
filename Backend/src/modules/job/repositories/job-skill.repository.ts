import { JobSkill } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface IJobSkillRepository extends IBaseRepository<JobSkill> {
  getAllByJob(jobId: number): Promise<JobSkill[]>;
  deleteJobSkill(jobId: number, skillName: string): Promise<boolean>;
}
