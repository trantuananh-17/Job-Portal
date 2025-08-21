import { CompanyIndustry } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface ICompanyIndustryRepository {
  create(companyId: number, industryName: string): Promise<CompanyIndustry>;
  getByCompanyId(companyId: number): Promise<CompanyIndustry[]>;
  findCompanyIndustry(companyId: number, industryName: string): Promise<CompanyIndustry | null>;
  delete(companyId: number, industryName: string): Promise<boolean>;
}
