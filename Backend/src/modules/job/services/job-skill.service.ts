import { JobSkill } from '@prisma/client';

export interface IJobSkillService {
  create(jobId: number, skillName: string, userId: number): Promise<JobSkill>;
  getAllByJob(jobId: number): Promise<JobSkill[]>;
  delete(jobId: number, skillName: string, userId: number): Promise<void>;
  createMany(jobId: number, skills: string[], userId: number): Promise<number>;

  deleteMany(jobId: number): Promise<void>;
}
