import { JobSkill, PrismaClient } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { IJobSkillRepository } from '../job-skill.repository';

class JobSkillRepository extends BaseRepository<JobSkill> implements IJobSkillRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.jobSkill);
  }

  async getAllByJob(jobId: number): Promise<JobSkill[]> {
    return await this.prisma.jobSkill.findMany({
      where: { jobId }
    });
  }

  async deleteJobSkill(jobId: number, skillName: string): Promise<boolean> {
    const deleted = await this.prisma.jobSkill.delete({
      where: {
        jobId_skillName: {
          jobId,
          skillName
        }
      }
    });

    return !!deleted;
  }
}

export const jobSkillRepository: IJobSkillRepository = new JobSkillRepository(prisma);
