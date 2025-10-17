import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { jobService } from '../services/implements/job.service.impl';
import { IJobService } from '../services/job.service';
import { IJob } from '../interfaces/job.interface';
import { JobStatus } from '@prisma/client';

class JobController {
  constructor(private readonly jobService: IJobService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getAllForRecruiter = this.getAllForRecruiter.bind(this);
    this.getJobByRecruiter = this.getJobByRecruiter.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.delete = this.delete.bind(this);
    this.searchCompletion = this.searchCompletion.bind(this);
    this.searchJobsFilter = this.searchJobsFilter.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const {
      companyId,
      title,
      description,
      benefits,
      jobRoleName,
      requirements,
      minSalary,
      maxSalary,
      skills,
      activeDays
    } = req.body;

    const payload: IJob = {
      companyId,
      title,
      description,
      benefits,
      jobRoleName,
      requirements,
      minSalary,
      maxSalary,
      activeDays
    };

    const job = await this.jobService.create(payload, skills, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Created job successfully',
      data: job
    });
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { page = '1', limit = '5' } = req.query;

      const result = await this.jobService.getAllJob(+page, +limit);

      return res.status(HttpStatus.OK).json({
        message: 'Get all jobs successfully',
        pagination: {
          totalDocs: result.totalDocs,
          totalPages: result.totalPages,
          currentPage: result.page,
          limit: result.limit
        },
        data: result.data
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to get jobs' });
    }
  }

  public async getAllForRecruiter(req: Request, res: Response) {
    const { page = 1, limit = 5, status, minSalary = 0 } = req.query;
    const userId = +req.user.id;
    const jobStatus = status && status !== 'all' ? (status as JobStatus) : undefined;

    const data = await this.jobService.getAllJobByRecruiter(+page, +limit, userId, jobStatus);

    return res.status(HttpStatus.OK).json({
      message: 'Get all jobs',
      pagination: {
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        currentPage: data.page,
        limit: data.limit
      },
      data: data.data
    });
  }

  public async getJobByRecruiter(req: Request, res: Response) {
    const jobId = req.params.id;

    const data = await this.jobService.getJobByRecruiter(Number(jobId));

    return res.status(HttpStatus.OK).json({
      message: 'Get job successfully',

      data: data
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
    const {
      companyId,
      title,
      description,
      benefits,
      jobRoleName,
      requirements,
      minSalary,
      maxSalary,
      activeDays,
      skills
    } = req.body;

    const payload: IJob = {
      companyId,
      title,
      description,
      benefits,
      jobRoleName,
      requirements,
      minSalary,
      maxSalary,
      activeDays
    };

    const job = await this.jobService.update(
      parseInt(req.params.id),
      parseInt(req.params.companyId),
      skills,
      payload,
      userId
    );

    return res.status(HttpStatus.OK).json({
      message: 'Update job successfully',
      data: job
    });
  }

  public async updateStatus(req: Request, res: Response) {
    const job = await this.jobService.updateStatus(parseInt(req.params.id), req.body.status);

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

  public async deleteJobByAdmin(req: Request, res: Response) {
    await this.jobService.deleteJobByAdmin(Number(req.params.id));

    return res.status(HttpStatus.OK).json({
      message: 'Delete job successfully'
    });
  }

  public async searchCompletion(req: Request, res: Response) {
    const { q = '', page = 1, limit = 10 } = req.query;

    const data = await this.jobService.searchCompletion(Number(page), Number(limit), q as string);

    return res.status(HttpStatus.OK).json({
      message: 'Get title job successfully',
      data
    });
  }

  public async searchJobsFilter(req: Request, res: Response) {
    const { page = 1, limit = 6, search = '', location = '', roles = [], dates = [], min, max } = req.query;

    const filter = {
      location: location as string,
      jobRoles: typeof roles === 'string' && roles.length > 0 ? roles.split(',') : [],
      dateRange:
        typeof dates === 'string' && dates.length > 0
          ? (dates.split(',')[0] as 'Last Hour' | 'Last 24 Hours' | 'Last 7 Days' | 'Last 30 Days')
          : undefined,
      minSalary: min ? Number(min) : undefined,
      maxSalary: max ? Number(max) : undefined
    };

    const data = await this.jobService.searchJobsFilter(+page, +limit, search as string, filter);

    return res.status(HttpStatus.OK).json({
      message: 'Get jobs filter successfully',
      pagination: {
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        currentPage: data.page,
        limit: data.limit
      },
      data: data.data
    });
  }
}

export const jobController: JobController = new JobController(jobService);
