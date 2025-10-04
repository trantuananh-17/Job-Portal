import { CompanyImage, PrismaClient } from '@prisma/client';
import { ICompanyImageRepository } from '../company-image.repository';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { ICreateCompanyImage } from '../../interfaces/company-image.interface';

class CompanyImageRepository extends BaseRepository<CompanyImage> implements ICompanyImageRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.companyImage);
  }

  async deleteImage(companyId: number, companyImageId: number): Promise<boolean> {
    const deleted = await this.prisma.companyImage.delete({
      where: { id: companyImageId, companyId }
    });

    return !!deleted;
  }

  async findOne(companyId: number, companyImageId: number): Promise<CompanyImage | null> {
    return await this.prisma.companyImage.findFirst({
      where: { companyId, id: companyImageId }
    });
  }

  async findMany(companyId: number): Promise<CompanyImage[]> {
    return await this.prisma.companyImage.findMany({
      where: { companyId }
    });
  }

  async createMany(data: ICreateCompanyImage[]): Promise<void> {
    await this.prisma.companyImage.createMany({ data });
  }
}

export const companyImageRepository: ICompanyImageRepository = new CompanyImageRepository(prisma);
