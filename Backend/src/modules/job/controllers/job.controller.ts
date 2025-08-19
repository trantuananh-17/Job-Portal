import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { jobService } from '../services/implements/job.service.impl';

class JobController {
  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const job = await jobService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Created job successfully',
      data: job
    });
  }
}

export const jobController: JobController = new JobController();
