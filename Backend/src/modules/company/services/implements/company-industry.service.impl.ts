import { CompanyIndustry } from '@prisma/client';
import { ICompanyIndustryService } from '../company-industry.service';
import { companyIndustryRepository } from '../../repositories/implements/company-industry.repository.impl';
import { NotFoundException } from '~/global/core/error.core';
import { companyService } from './company.service.impl';
import { industryService } from '~/modules/industry/services/industry.service';

class CompanyIndustryService implements ICompanyIndustryService {
  async create(companyId: number, industryName: string, userId: number): Promise<CompanyIndustry> {
    await companyService.findOne(companyId, userId);
    await industryService.findIndustry(industryName);

    const companyIndustry = await companyIndustryRepository.create(companyId, industryName);

    return companyIndustry;
  }

  async getByCompanyId(companyId: number): Promise<CompanyIndustry[]> {
    const companyIndustries = companyIndustryRepository.getByCompanyId(companyId);

    return companyIndustries;
  }

  async delete(companyId: number, industryName: string, userId: number): Promise<void> {
    await companyService.findOne(companyId, userId);
    await industryService.findIndustry(industryName);
    await this.findCompanyIndustry(companyId, industryName);

    await companyIndustryRepository.delete(companyId, industryName);
  }

  private async findCompanyIndustry(companyId: number, industryName: string) {
    const companyIndustry = await companyIndustryRepository.findCompanyIndustry(companyId, industryName);

    if (!companyIndustry) throw new NotFoundException(`Company ${companyId} does not have industry: ${industryName}`);
  }
}

export const companyIndustryService: ICompanyIndustryService = new CompanyIndustryService();
