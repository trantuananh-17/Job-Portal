import { Package, Prisma, PrismaClient } from '@prisma/client';
import { IPackageRepository } from '../package.repository';
import prisma from '~/prisma';
import { IPackage, IPackageResponseByAdmin } from '../../interfaces/package.interface';

class PackageRepository implements IPackageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(label: string, price: number, jobPostLimit: number): Promise<Package> {
    return await this.prisma.package.create({
      data: {
        label,
        price,
        jobPostLimit
      }
    });
  }

  async getAllByAdmin(page: number, limit: number): Promise<{ data: IPackageResponseByAdmin[]; total: number }> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.package.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          label: true,
          price: true,
          jobPostLimit: true,
          salePrice: true,
          priorityLevel: true,
          isActive: true,
          isDelete: true,
          isRecommended: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { orders: true }
          }
        },
        orderBy: {
          jobPostLimit: 'desc'
        }
      }),
      this.prisma.package.count()
    ]);

    return { data, total };
  }

  async readOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package | null> {
    return await this.prisma.package.findUnique({
      where: { id, isActive: where?.isActive }
    });
  }

  async update(id: number, requestBody: Partial<IPackage>): Promise<Package> {
    const { label, price, jobPostLimit } = requestBody;
    return await this.prisma.package.update({
      where: { id },
      data: {
        label,
        price,
        jobPostLimit
      }
    });
  }

  async updateActive(id: number, isActive: boolean): Promise<Package> {
    return await this.prisma.package.update({
      where: { id },
      data: {
        isActive
      }
    });
  }
}

export const packageRepository: IPackageRepository = new PackageRepository(prisma);
