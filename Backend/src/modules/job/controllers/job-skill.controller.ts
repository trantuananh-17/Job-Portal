import { Request, Response } from 'express';
import { jobSkillService } from '../services/implements/job-skill.service.impl';
import HttpStatus from '~/global/constants/http.constant';
import { IJobSkillService } from '../services/job-skill.service';

class JobSkillController {
  constructor(private readonly jobSkillService: IJobSkillService) {
    this.create = this.create.bind(this);
    this.getAllByJob = this.getAllByJob.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    const { jobId, skillName } = req.body;
    const userId = +req.user.id;
    const jobSkill = await this.jobSkillService.create(jobId, skillName, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create job skill successfully',
      data: jobSkill
    });
  }

  public async getAllByJob(req: Request, res: Response) {
    const jobId = +req.params.jobId;

    const jobSkills = await this.jobSkillService.getAllByJob(jobId);

    return res.status(HttpStatus.OK).json({
      message: 'Get all job skills',
      data: jobSkills
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const jobId = +req.params.jobId;
    const skillName = req.params.skillName;

    await this.jobSkillService.delete(jobId, skillName, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Remove job skill successfully'
    });
  }
}

export const jobSkillController: JobSkillController = new JobSkillController(jobSkillService);
