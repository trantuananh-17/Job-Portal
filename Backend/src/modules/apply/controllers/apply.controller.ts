import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { IApplyService } from '../services/apply.service';
import { applyService } from '../services/implements/apply.service.impl';

class ApplyController {
  constructor(private readonly applyService: IApplyService) {
    this.create = this.create.bind(this);
    this.getByMe = this.getByMe.bind(this);
    this.getByRecruiter = this.getByRecruiter.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  public async create(req: Request, res: Response) {
    const { jobId } = req.body;
    const userId = +req.user.id;
    const apply = await this.applyService.create(+jobId, userId, req.file as Express.Multer.File);

    return res.status(HttpStatus.CREATED).json({
      message: 'Apply job successfully',
      data: apply
    });
  }

  public async getByMe(req: Request, res: Response) {
    const { page = 1, limit = 5 } = req.query;
    const userId = +req.user.id;

    const { data, totalCounts } = await this.applyService.getByMe(
      { page: parseInt(page as string), limit: parseInt(limit as string) },
      userId
    );

    return res.status(HttpStatus.OK).json({
      message: 'Get my applications',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data
    });
  }

  public async getByRecruiter(req: Request, res: Response) {
    const { page = 1, limit = 5 } = req.query;
    const userId = +req.user.id;

    const { data, totalCounts } = await this.applyService.getByRecruiter(
      { page: parseInt(page as string), limit: parseInt(limit as string) },
      parseInt(req.params.jobId),
      userId
    );

    return res.status(HttpStatus.OK).json({
      message: 'Get my applications',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data
    });
  }

  public async updateStatus(req: Request, res: Response) {
    const userId = +req.user.id;

    const apply = await this.applyService.updateStatus(req.body, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Update status successfully',
      data: apply
    });
  }
}

export const applyController: ApplyController = new ApplyController(applyService);
