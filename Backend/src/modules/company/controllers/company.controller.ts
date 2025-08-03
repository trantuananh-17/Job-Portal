import { Request, Response } from 'express';
import { companyService } from '../services/implements/company.service.impl';
import HttpStatus from '~/global/constants/http.constant';

class CompanyController {
  public async create(req: Request, res: Response) {
    const userId = +req.user.id;

    const company = await companyService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create company successfully',
      data: company
    });
  }

  public async getAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;
    const { data, totalCounts } = await companyService.getAllPagination({
      page: +page,
      limit: +limit,
      filter
    });

    return res.status(HttpStatus.CREATED).json({
      message: 'Get all companies',
      data: {
        data,
        pagination: {
          totalCounts,
          currentPage: parseInt(page as string)
        }
      }
    });
  }

  public async getMyCompanies(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;
    const userId = +req.user.id;

    const { data, totalCounts } = await companyService.getMyCompanies({ page: +page, limit: +limit, filter }, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Get all companies',
      data: {
        data,
        pagination: {
          totalCounts,
          currentPage: parseInt(page as string)
        }
      }
    });
  }

  public async getAllForAdmin(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { data, totalCounts } = await companyService.getAllPaginationForAdmin({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    });

    res.status(HttpStatus.OK).json({
      message: 'Get all companies',
      data: {
        data,
        pagination: {
          totalCounts,
          currentPage: parseInt(page as string)
        }
      }
    });
  }
}

export const companyController: CompanyController = new CompanyController();
