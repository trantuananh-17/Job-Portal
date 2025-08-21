import { JobSkill } from '@prisma/client';
import { IJobSkillService } from '../job-skill.service';
import { jobSkillRepository } from '../../repositories/implements/job-skill.repository.impl';
import { skillService } from '~/modules/skill/services/implements/skill.service.impl';
import { jobService } from './job.service.impl';
import { JobSyncService } from '~/search/job/sync/job.sync';

class JobSkillService implements IJobSkillService {
  private readonly jobSyncService = new JobSyncService();

  async create(jobId: number, skillName: string, userId: number): Promise<JobSkill> {
    await skillService.findSkill(skillName);

    const data = {
      jobId,
      skillName
    };

    const jobSkill = await jobSkillRepository.create(data);

    const jobIndex = await jobService.findIndex(jobId);

    if (jobIndex) {
      this.jobSyncService.updateJob(jobIndex);
    }

    return jobSkill;
  }

  async getAllByJob(jobId: number): Promise<JobSkill[]> {
    const jobSkills = await jobSkillRepository.getAllByJob(jobId);

    return jobSkills;
  }

  async delete(jobId: number, skillName: string, userId: number): Promise<void> {
    await jobSkillRepository.deleteJobSkill(jobId, skillName);

    const jobIndex = await jobService.findIndex(jobId);

    if (jobIndex) {
      this.jobSyncService.updateJob(jobIndex);
    }
  }
}

export const jobSkillService: IJobSkillService = new JobSkillService();
