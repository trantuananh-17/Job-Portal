import { Request, Response } from 'express';
import { jobRoleService } from '../services/implements/job-role.service.impl';
import HttpStatus from '~/global/constants/http.constant';
import { IJobRoleService } from '../services/job-role.service';

class JobRoleController {
  constructor(private readonly jobRoleService: IJobRoleService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const jobRole = await jobRoleService.create(name);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create job role successfully',
      data: jobRole
    });
  }

  async getAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { data, totalCounts } = await jobRoleService.getAll({
      page: +page,
      limit: +limit,
      filter
    });

    return res.status(HttpStatus.OK).json({
      message: 'Get all job role',
      data: {
        data,
        pagination: {
          totalCounts,
          currentPage: +page
        }
      }
    });
  }

  async delete(req: Request, res: Response) {
    const name = req.params.name;

    await jobRoleService.delete(name);

    return res.status(HttpStatus.OK).json({
      message: 'Deleted job role successfully'
    });
  }
}

export const jobRoleController: JobRoleController = new JobRoleController(jobRoleService);
