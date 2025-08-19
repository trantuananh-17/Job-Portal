import { Request, Response } from 'express';
import { jobSkillService } from '../services/implements/job-skill.service.impl';
import HttpStatus from '~/global/constants/http.constant';

class JobSkillController {
  public async create(req: Request, res: Response) {
    const { jobId, skillName } = req.body;
    const userId = +req.user.id;
    const jobSkill = await jobSkillService.create(jobId, skillName, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create job skill successfully',
      data: jobSkill
    });
  }

  public async getAllByJob(req: Request, res: Response) {
    const userId = +req.user.id;

    const jobSkills = await jobSkillService.getAllByJob(userId);

    return res.status(HttpStatus.OK).json({
      message: 'Get all job skills',
      data: jobSkills
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const jobId = +req.params.jobId;
    const skillName = req.params.skillName;

    await jobSkillService.delete(jobId, skillName, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Remove job skill successfully'
    });
  }
}

export const jobSkillController: JobSkillController = new JobSkillController();
