import { Package, Prisma } from '@prisma/client';
import { IPackageRepository } from '../package.repository';
import prisma from '~/prisma';
import { IPackage } from '../../interfaces/package.interface';

class PackageRepository implements IPackageRepository {
  async create(label: string, price: number, jobPostLimit: number): Promise<Package> {
    return await prisma.package.create({
      data: {
        label,
        price,
        jobPostLimit
      }
    });
  }

  async readAll(where?: Prisma.PackageWhereInput): Promise<Package[]> {
    return await prisma.package.findMany({ where });
  }

  async readOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package | null> {
    return await prisma.package.findUnique({
      where: { id, isActive: where?.isActive }
    });
  }

  async update(id: number, requestBody: Partial<IPackage>): Promise<Package> {
    const { label, price, jobPostLimit } = requestBody;
    return await prisma.package.update({
      where: { id },
      data: {
        label,
        price,
        jobPostLimit
      }
    });
  }

  async updateActive(id: number, isActive: boolean): Promise<Package> {
    return await prisma.package.update({
      where: { id },
      data: {
        isActive
      }
    });
  }
}

export const packageRepository: IPackageRepository = new PackageRepository();
