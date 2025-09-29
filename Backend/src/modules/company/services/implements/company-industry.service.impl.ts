import { CompanyIndustry } from '@prisma/client';
import { ICompanyIndustryService } from '../company-industry.service';
import { companyIndustryRepository } from '../../repositories/implements/company-industry.repository.impl';
import { NotFoundException } from '~/global/core/error.core';
import { companyService } from './company.service.impl';
import { industryService } from '~/modules/industry/services/implements/industry.service.impl';
import { IIndustryService } from '~/modules/industry/services/industry.service';
import { ICompanyService } from '../company.service';
import { ICompanyIndustryRepository } from '../../repositories/company-industry.repository';

class CompanyIndustryService implements ICompanyIndustryService {
  constructor(
    private readonly companyIndustryRepository: ICompanyIndustryRepository,
    private readonly companyService: ICompanyService,
    private readonly industryService: IIndustryService
  ) {}

  async create(companyId: number, industryName: string, userId: number): Promise<CompanyIndustry> {
    await this.companyService.findOne(companyId, userId);
    await this.industryService.findIndustry(industryName);

    const companyIndustry = await this.companyIndustryRepository.create(companyId, industryName);

    return companyIndustry;
  }

  async getByCompanyId(companyId: number): Promise<CompanyIndustry[]> {
    const companyIndustries = this.companyIndustryRepository.getByCompanyId(companyId);

    return companyIndustries;
  }

  async delete(companyId: number, industryName: string, userId: number): Promise<void> {
    await this.companyService.findOne(companyId, userId);
    await this.industryService.findIndustry(industryName);
    await this.findCompanyIndustry(companyId, industryName);

    await this.companyIndustryRepository.delete(companyId, industryName);
  }

  private async findCompanyIndustry(companyId: number, industryName: string) {
    const companyIndustry = await this.companyIndustryRepository.findCompanyIndustry(companyId, industryName);

    if (!companyIndustry) throw new NotFoundException(`Company ${companyId} does not have industry: ${industryName}`);
  }
}

export const companyIndustryService: ICompanyIndustryService = new CompanyIndustryService(
  companyIndustryRepository,
  companyService,
  industryService
);
