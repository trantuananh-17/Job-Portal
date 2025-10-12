import { JobSkill } from '@prisma/client';
import { skillService } from '~/modules/skill/services/implements/skill.service.impl';
import { ISkillService } from '~/modules/skill/services/skill.service';
import { jobSkillRepository } from '../../repositories/implements/job-skill.repository.impl';
import { IJobSkillRepository } from '../../repositories/job-skill.repository';
import { IJobSkillService } from '../job-skill.service';
import { BadRequestException } from '~/global/core/error.core';

class JobSkillService implements IJobSkillService {
  constructor(
    private readonly skillService: ISkillService,
    private readonly jobSkillRepository: IJobSkillRepository
  ) {}

  async createMany(jobId: number, skills: string[], userId: number): Promise<number> {
    const result = await this.jobSkillRepository.createMany(jobId, skills);

    return result;
  }

  async create(jobId: number, skillName: string, userId: number): Promise<JobSkill> {
    await this.skillService.findSkill(skillName);

    const data = {
      jobId,
      skillName
    };

    const jobSkill = await this.jobSkillRepository.create(data);

    return jobSkill;
  }

  async getAllByJob(jobId: number): Promise<JobSkill[]> {
    const jobSkills = await this.jobSkillRepository.getAllByJob(jobId);

    return jobSkills;
  }

  async delete(jobId: number, skillName: string, userId: number): Promise<void> {
    await this.jobSkillRepository.deleteJobSkill(jobId, skillName);
  }
}

export const jobSkillService: IJobSkillService = new JobSkillService(skillService, jobSkillRepository);
