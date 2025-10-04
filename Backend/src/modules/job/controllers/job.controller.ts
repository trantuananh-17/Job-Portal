import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { jobService } from '../services/implements/job.service.impl';
<<<<<<< HEAD
import { jobQuery } from '~/search/job/queries/job.query';
import { esClient } from '~/global/configs/elastic.config';
=======
import { IJobService } from '../services/job.service';
>>>>>>> a500c70da7b3e9f3f9f39150fe35673db31133b4

class JobController {
  constructor(private readonly jobService: IJobService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getAllForRecruiter = this.getAllForRecruiter.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const job = await this.jobService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Created job successfully',
      data: job
    });
  }

  public async getAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '', minSalary = 0 } = req.query;

    const { data, totalCounts } = await this.jobService.getAll({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter,
      minSalary: parseFloat(minSalary as string)
    });

    return res.status(HttpStatus.OK).json({
      message: 'Get all jobs',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data
    });
  }

  public async getAllForRecruiter(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '', minSalary = 0 } = req.query;
    const userId = +req.user.id;

    const { data, totalCounts } = await this.jobService.getAllForRecruiter(
      {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        filter,
        minSalary: parseFloat(minSalary as string)
      },
      userId
    );

    return res.status(HttpStatus.OK).json({
      message: 'Get all jobs',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data
    });
  }

  public async getOne(req: Request, res: Response) {
    const job = await this.jobService.getOne(parseInt(req.params.id));

    return res.status(HttpStatus.OK).json({
      message: 'Get single job',
      data: job
    });
  }

  public async update(req: Request, res: Response) {
    const userId = +req.user.id;

    const job = await this.jobService.update(parseInt(req.params.id), parseInt(req.params.companyId), req.body, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Update job successfully',
      data: job
    });
  }

  public async updateStatus(req: Request, res: Response) {
    const userId = +req.user.id;

    const job = await this.jobService.updateStatus(
      parseInt(req.params.id),
      parseInt(req.params.companyId),
      req.body.status,
      userId
    );

    return res.status(HttpStatus.OK).json({
      message: 'Update job status successfully',
      data: job
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;

    await this.jobService.delete(parseInt(req.params.id), parseInt(req.params.companyId), userId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete job successfully'
    });
  }

  public async getES(req: Request, res: Response) {
    const query = jobQuery.searchMany();
    const jobs = await esClient.search(query);

    return res.status(HttpStatus.OK).json({
      message: 'Delete job successfully',
      data: jobs.hits.hits
    });
  }
}

export const jobController: JobController = new JobController(jobService);
