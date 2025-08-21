import { Request, Response } from 'express';
import { jobBenefitService } from '../services/implements/job-benefit.service.impl';
import HttpStatus from '~/global/constants/http.constant';

class JobBenefitController {
  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const { jobId, benefitName } = req.body;

    const jobBenefit = await jobBenefitService.create(jobId, benefitName, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create job benefit successfully',
      data: jobBenefit
    });
  }

  public async getBenefitByJob(req: Request, res: Response) {
    const jobId = +req.params.jobId;

    const jobBenefits = await jobBenefitService.getAllByJobId(jobId);

    return res.status(HttpStatus.OK).json({
      message: 'Get all job benefits',
      data: jobBenefits
    });
  }

  public async delete(req: Request, res: Response) {
    const jobId = +req.params.jobId;
    const userId = +req.user.id;
    const benefitName = req.params.benefitName;

    await jobBenefitService.delete(jobId, benefitName, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete job benefit successfully'
    });
  }
}

export const jobBenefitController: JobBenefitController = new JobBenefitController();
