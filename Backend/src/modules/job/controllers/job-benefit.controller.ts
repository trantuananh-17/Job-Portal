import { Request, Response } from 'express';
import { jobBenefitService } from '../services/implements/job-benefit.service.impl';
import HttpStatus from '~/global/constants/http.constant';
import { IJobBenefitService } from '../services/job-benefit.service';

class JobBenefitController {
  constructor(private readonly jobBenefitService: IJobBenefitService) {
    this.create = this.create.bind(this);
    this.getBenefitByJob = this.getBenefitByJob.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const { jobId, benefitName } = req.body;

    const jobBenefit = await this.jobBenefitService.create(jobId, benefitName, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create job benefit successfully',
      data: jobBenefit
    });
  }

  public async getBenefitByJob(req: Request, res: Response) {
    const jobId = +req.params.jobId;

    const jobBenefits = await this.jobBenefitService.getAllByJobId(jobId);

    return res.status(HttpStatus.OK).json({
      message: 'Get all job benefits',
      data: jobBenefits
    });
  }

  public async delete(req: Request, res: Response) {
    const jobId = +req.params.jobId;
    const userId = +req.user.id;
    const benefitName = req.params.benefitName;

    await this.jobBenefitService.delete(jobId, benefitName, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete job benefit successfully'
    });
  }
}

export const jobBenefitController: JobBenefitController = new JobBenefitController(jobBenefitService);
