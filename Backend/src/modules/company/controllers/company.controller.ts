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

    console.log('hello');

    const { data, totalCounts } = await companyService.getAllPaginationForAdmin({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    });

    console.log(data);

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

  public async getOne(req: Request, res: Response) {
    const id = +req.params.id;
    const company = await companyService.getOne(id);

    return res.status(HttpStatus.OK).json({
      message: 'Get single company',
      data: company
    });
  }

  public async update(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = +req.user.id;

    const company = await companyService.update(id, req.body, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Update company successfully',
      data: company
    });
  }

  public async getOneAdmin(req: Request, res: Response) {
    const id = +req.params.id;

    const company = await companyService.getOneAdmin(id);

    return res.status(HttpStatus.OK).json({
      message: 'Get single company',
      data: company
    });
  }

  public async updateApproved(req: Request, res: Response) {
    const id = +req.params.id;
    const { isApproved } = req.body;

    const company = await companyService.approved(id, isApproved);

    return res.status(HttpStatus.OK).json({
      message: 'Change approved successfully',
      data: company
    });
  }

  public async remove(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = +req.user.id;

    await companyService.delete(id, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete company successfully'
    });
  }
}

export const companyController: CompanyController = new CompanyController();
