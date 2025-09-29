import { JobSkill } from '@prisma/client';
import { IJobSkillService } from '../job-skill.service';
import { jobSkillRepository } from '../../repositories/implements/job-skill.repository.impl';
import { skillService } from '~/modules/skill/services/implements/skill.service.impl';
import { jobService } from './job.service.impl';
import { JobSyncService } from '~/search/job/sync/job.sync';
import { ISkillService } from '~/modules/skill/services/skill.service';
import { IJobService } from '../job.service';
import { IJobSkillRepository } from '../../repositories/job-skill.repository';

class JobSkillService implements IJobSkillService {
  private readonly jobSyncService = new JobSyncService();

  constructor(
    private readonly skillService: ISkillService,
    private readonly jobSkillRepository: IJobSkillRepository,
    private readonly jobService: IJobService
  ) {}

  async create(jobId: number, skillName: string, userId: number): Promise<JobSkill> {
    await this.skillService.findSkill(skillName);

    const data = {
      jobId,
      skillName
    };

    const jobSkill = await this.jobSkillRepository.create(data);

    const jobIndex = await this.jobService.findIndex(jobId);

    if (jobIndex) {
      this.jobSyncService.updateJob(jobIndex);
    }

    return jobSkill;
  }

  async getAllByJob(jobId: number): Promise<JobSkill[]> {
    const jobSkills = await this.jobSkillRepository.getAllByJob(jobId);

    return jobSkills;
  }

  async delete(jobId: number, skillName: string, userId: number): Promise<void> {
    await this.jobSkillRepository.deleteJobSkill(jobId, skillName);

    const jobIndex = await jobService.findIndex(jobId);

    if (jobIndex) {
      this.jobSyncService.updateJob(jobIndex);
    }
  }
}

export const jobSkillService: IJobSkillService = new JobSkillService(skillService, jobSkillRepository, jobService);
