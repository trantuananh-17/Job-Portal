import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { ICompanyIndustryService } from '../services/company-industry.service';
import { companyIndustryService } from './../services/implements/company-industry.service.impl';

class CompanyIndustryController {
  constructor(private readonly companyIndustryService: ICompanyIndustryService) {
    this.create = this.create.bind(this);
    this.getByCompanyId = this.getByCompanyId.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const companyId = +req.params.companyId;
    const { industryName } = req.body;

    const companyIndustry = await this.companyIndustryService.create(companyId, industryName, userId);

    res.status(HttpStatus.CREATED).json({
      message: 'Add industry to company successfully',
      data: companyIndustry
    });
  }

  public async getByCompanyId(req: Request, res: Response) {
    const companyId = +req.params.companyId;

    const companyIndustries = await this.companyIndustryService.getByCompanyId(companyId);

    return res.status(HttpStatus.OK).json({
      message: 'Get all company industries',
      data: companyIndustries
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const companyId = +req.params.companyId;
    const { industryName } = req.body;

    await this.companyIndustryService.delete(companyId, industryName, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete company industry successfully'
    });
  }
}

export const companyIndustryController: CompanyIndustryController = new CompanyIndustryController(
  companyIndustryService
);
