import { JobSkill } from '@prisma/client';
import { IJobSkillService } from '../job-skill.service';
import { jobSkillRepository } from '../../repositories/implements/job-skill.repository.impl';
import { skillService } from '~/modules/skill/services/implements/skill.service.impl';

class JobSkillService implements IJobSkillService {
  async create(jobId: number, skillName: string, userId: number): Promise<JobSkill> {
    await skillService.findSkill(skillName);

    const data = {
      jobId,
      skillName
    };

    const jobSkill = await jobSkillRepository.create(data);

    return jobSkill;
  }

  async getAllByJob(jobId: number): Promise<JobSkill[]> {
    const jobSkills = await jobSkillRepository.getAllByJob(jobId);

    return jobSkills;
  }

  async delete(jobId: number, skillName: string, userId: number): Promise<void> {
    await jobSkillRepository.deleteJobSkill(jobId, skillName);
  }
}

export const jobSkillService: IJobSkillService = new JobSkillService();
