import { Company } from '@prisma/client';
import { ICompanyRepository } from '../company.repository';
import prisma from '~/prisma';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICompany } from '../../interfaces/company.interface';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
class CompanyRepository extends BaseRepository<Company> implements ICompanyRepository {
  constructor() {
    super(prisma.company);
  }

  async getOne(companyId: number, userId: number): Promise<Company | null> {
    return await prisma.company.findFirst({ where: { id: companyId, userId } });
  }

  async getMyCompanies(userId: number): Promise<Company[]> {
    return await prisma.company.findMany({
      where: {
        userId
      }
    });
  }

  async getAll(): Promise<Company[]> {
    return await prisma.company.findMany({
      where: {
        isApproved: true
      }
    });
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

  async updateCompany(id: number, data: Partial<ICompany>, userId: number): Promise<Company> {
    return await prisma.company.update({
      where: { id, userId },
      data: {
        name: data.name,
        description: data.description,
        teamSize: data.teamSize,
        establishmentDate: data.establishmentDate ? new Date(data.establishmentDate) : undefined,
        websiteUrl: data.websiteUrl,
        mapLink: data.mapLink,
        address: data.address
      }
    });
  }

  async updateApproved(id: number, isApproved: boolean): Promise<Company> {
    return await prisma.company.update({
      where: { id },
      data: { isApproved }
    });
  }

  async deleteCompany(id: number, userId: number): Promise<boolean> {
    const deleted = await prisma.company.delete({
      where: {
        id,
        userId
      }
    });

    return !!deleted;
  }
}

export const companyRepository: ICompanyRepository = new CompanyRepository();
