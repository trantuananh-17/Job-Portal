import { Request, Response } from 'express';
import { companyService } from '../services/implements/company.service.impl';
import HttpStatus from '~/global/constants/http.constant';
import { ICompanyService } from '../services/company.service';

class CompanyController {
  constructor(private readonly companyService: ICompanyService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getMyCompanies = this.getMyCompanies.bind(this);
    this.getMyCompany = this.getMyCompany.bind(this);
    this.getAllForAdmin = this.getAllForAdmin.bind(this);
    this.getOne = this.getOne.bind(this);
    this.updateApproved = this.updateApproved.bind(this);
    this.update = this.update.bind(this);
    this.getOneAdmin = this.getOneAdmin.bind(this);
    this.remove = this.remove.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;

    const company = await this.companyService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create company successfully',
      data: company
    });
  }

  public async getAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;
    const { data, totalCounts } = await this.companyService.getAllPagination({
      page: +page,
      limit: +limit,
      filter
    });

    return res.status(HttpStatus.OK).json({
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

    const { data, totalCounts } = await this.companyService.getMyCompanies(
      { page: +page, limit: +limit, filter },
      userId
    );

    return res.status(HttpStatus.OK).json({
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

  public async getMyCompany(req: Request, res: Response) {
    const userId = req.user.id;

    const company = await this.companyService.getMyCompany(+userId);

    return res.status(HttpStatus.OK).json({
      message: 'Get company info successfully.',
      data: company
    });
  }

  public async getAllForAdmin(req: Request, res: Response) {
    const { page = 1, limit = 8, status, q } = req.query;
    const companyStatus = status && status !== 'all' ? (status as string) : undefined;

    const data = await this.companyService.getAllAdmin(+page, +limit, q as string, companyStatus);

    res.status(HttpStatus.OK).json({
      message: 'Get all companies',
      pagination: {
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        currentPage: data.page,
        limit: data.limit
      },
      data: data.data
    });
  }

  public async getOne(req: Request, res: Response) {
    const id = +req.params.id;
    const company = await this.companyService.getOne(id);

    return res.status(HttpStatus.OK).json({
      message: 'Get single company',
      data: company
    });
  }

  public async update(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = +req.user.id;

    const company = await this.companyService.update(id, req.body, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Update company successfully',
      data: company
    });
  }

  public async getOneAdmin(req: Request, res: Response) {
    const id = +req.params.id;

    const company = await this.companyService.getOneAdmin(id);

    return res.status(HttpStatus.OK).json({
      message: 'Get single company',
      data: company
    });
  }

  public async updateApproved(req: Request, res: Response) {
    const id = +req.params.id;
    const { isApproved } = req.body;

    const company = await this.companyService.approved(id, isApproved);

    return res.status(HttpStatus.OK).json({
      message: 'Change approved successfully',
      data: company
    });
  }

  public async updateStatus(req: Request, res: Response) {
    const id = +req.params.id;
    const { note, status, isApproved } = req.body;

    const company = await this.companyService.updateStatus(id, status, isApproved, note);

    return res.status(HttpStatus.OK).json({
      message: 'Update status company successfully',
      data: company
    });
  }

  public async remove(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = +req.user.id;

    await this.companyService.delete(id, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete company successfully'
    });
  }
}

export const companyController: CompanyController = new CompanyController(companyService);
