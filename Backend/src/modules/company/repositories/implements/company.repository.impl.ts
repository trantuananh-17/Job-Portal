import { Company } from '@prisma/client';
import { ICompanyRepository } from '../company.repository';
import prisma from '~/prisma';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICompany } from '../../interfaces/company.interface';
class CompanyRepository extends BaseRepository<Company> implements ICompanyRepository {
  constructor() {
    super(prisma.company);
  }

  async createCompany(data: ICompany, userId: number): Promise<Company> {
    return await prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
        teamSize: data.teamSize,
        establishmentDate: new Date(data.establishmentDate),
        address: data.address,
        mapLink: data.mapLink,
        websiteUrl: data.websiteUrl,
        userId
      }
    });
  }
}

export const companyRepository: ICompanyRepository = new CompanyRepository();
