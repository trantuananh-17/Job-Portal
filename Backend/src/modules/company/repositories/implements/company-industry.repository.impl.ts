import { CompanyIndustry } from '@prisma/client';
import prisma from '~/prisma';
import { ICompanyIndustryRepository } from './../company-industry.repository';

class CompanyIndustryRepository implements ICompanyIndustryRepository {
  async create(companyId: number, industryName: string): Promise<CompanyIndustry> {
    return await prisma.companyIndustry.create({
      data: {
        companyId,
        industryName
      }
    });
  }

  async getByCompanyId(companyId: number): Promise<CompanyIndustry[]> {
    return await prisma.companyIndustry.findMany({ where: { companyId } });
  }

  async findCompanyIndustry(companyId: number, industryName: string): Promise<CompanyIndustry | null> {
    return await prisma.companyIndustry.findUnique({
      where: {
        companyId_industryName: {
          companyId,
          industryName
        }
      }
    });
  }

  async delete(companyId: number, industryName: string): Promise<boolean> {
    const deleted = await prisma.companyIndustry.delete({
      where: {
        companyId_industryName: {
          companyId,
          industryName
        }
      }
    });

    return !!deleted;
  }
}

export const companyIndustryRepository: ICompanyIndustryRepository = new CompanyIndustryRepository();
