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
}

export const companyController: CompanyController = new CompanyController();
