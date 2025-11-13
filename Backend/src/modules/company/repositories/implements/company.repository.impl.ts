import { Company, CompanyStatus, PrismaClient } from '@prisma/client';
import { ICompanyRepository } from '../company.repository';
import prisma from '~/prisma';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICompany, ICompanyByAdminResponse, ICompanyInfoResponse } from '../../interfaces/company.interface';
class CompanyRepository extends BaseRepository<Company> implements ICompanyRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.company);
  }

  async getTotalCompanyByAdmin(q: string, status?: CompanyStatus): Promise<number> {
    return await this.prisma.company.count({
      where: {
        ...(status ? { status } : {}),
        ...(q
          ? {
              name: {
                contains: q.trim(),
                mode: 'insensitive'
              }
            }
          : {})
      }
    });
  }

  async getCompanyByAdmin(id: number): Promise<ICompanyByAdminResponse | null> {
    return await this.prisma.company.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        teamSize: true,
        establishmentDate: true,
        views: true,
        websiteUrl: true,
        status: true,
        isApproved: true,
        mapLink: true,
        address: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });
  }

  async getAllAdmin(
    page: number,
    limit: number,
    q: string,
    status?: CompanyStatus
  ): Promise<ICompanyByAdminResponse[]> {
    return await this.prisma.company.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(q
          ? {
              name: {
                contains: q.trim(),
                mode: 'insensitive'
              }
            }
          : {})
      },
      select: {
        id: true,
        name: true,
        description: true,
        teamSize: true,
        establishmentDate: true,
        views: true,
        websiteUrl: true,
        status: true,
        isApproved: true,
        mapLink: true,
        address: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });
  }

  async updateStatus(id: number, status: CompanyStatus, isApproved: boolean): Promise<ICompanyInfoResponse> {
    return await this.prisma.company.update({
      where: { id },
      data: { isApproved, status },
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });
  }

  async getMyCompany(userId: number): Promise<Company | null> {
    return await this.prisma.company.findUnique({
      where: {
        userId
      }
    });
  }

  async getOne(companyId: number, userId: number): Promise<Company | null> {
    return await this.prisma.company.findFirst({ where: { id: companyId, userId } });
  }

  async getMyCompanies(userId: number): Promise<Company[]> {
    return await this.prisma.company.findMany({
      where: {
        userId
      }
    });
  }

  async getAll(): Promise<Company[]> {
    return await this.prisma.company.findMany({
      where: {
        isApproved: true
      }
    });
  }

  async createCompany(data: ICompany, userId: number): Promise<Company> {
    return await this.prisma.company.create({
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
    return await this.prisma.company.update({
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

  async updateApproved(id: number, isApproved: boolean): Promise<ICompanyInfoResponse> {
    return await this.prisma.company.update({
      where: { id },
      data: { isApproved },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        isApproved: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });
  }

  async deleteCompany(id: number, userId: number): Promise<boolean> {
    const deleted = await this.prisma.company.delete({
      where: {
        id,
        userId
      }
    });

    return !!deleted;
  }
}

export const companyRepository: ICompanyRepository = new CompanyRepository(prisma);
