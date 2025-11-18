import { Package, Prisma } from '@prisma/client';
import { IPackage, IPackageResponseByAdmin } from '../../interfaces/package.interface';
import { IPackageService } from '../package.service';
import { packageRepository } from '../../repositories/implements/package.repository.impl';
import { NotFoundException } from '~/global/core/error.core';
import { IPackageRepository } from '../../repositories/package.repository';

class PackageService implements IPackageService {
  constructor(private readonly packageRepository: IPackageRepository) {}

  async create(requestBody: IPackage): Promise<Package> {
    const { label, price, jobPostLimit } = requestBody;

    const packageEntity = await this.packageRepository.create(label, price, jobPostLimit);

    return packageEntity;
  }

  async getAllByAdmin(
    page: number,
    limit: number
  ): Promise<{ data: IPackageResponseByAdmin[]; totalDocs: number; totalPages: number; page: number; limit: number }> {
    const { data, total } = await this.packageRepository.getAllByAdmin(page, limit);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      totalDocs: total,
      totalPages,
      page,
      limit
    };
  }

  async getOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package> {
    const packageEntity = await this.packageRepository.readOne(id, where);

    if (!packageEntity) {
      throw new NotFoundException(`Package: ${id} not found`);
    }

    return packageEntity;
  }

  async update(id: number, requestBody: Partial<IPackage>): Promise<Package> {
    await this.getOne(id);

    const packageEntity = await this.packageRepository.update(id, requestBody);

    return packageEntity;
  }

  async updateActive(id: number, isActive: boolean): Promise<Package> {
    await this.getOne(id);

    const packageEntity = await this.packageRepository.updateActive(id, isActive);

    return packageEntity;
  }
}

export const packageService: IPackageService = new PackageService(packageRepository);
