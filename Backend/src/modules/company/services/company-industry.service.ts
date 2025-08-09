import { CompanyIndustry } from '@prisma/client';

export interface ICompanyIndustryService {
  create(companyId: number, industryName: string, userId: number): Promise<CompanyIndustry>;
  getByCompanyId(companyId: number): Promise<CompanyIndustry[]>;
  delete(companyId: number, industryName: string, userId: number): Promise<void>;
}
